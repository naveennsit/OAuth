const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const {ExtractJwt} = require('passport-jwt');
const knex = require('./utitlity/db');
const {USER_TABLE_NAME, JWT_SECRET, isPasswordValidate} = require('./utitlity/util');

// Jwt strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('auth'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        console.log('kkkk')
        // Find the user specified in token
        const user = await knex(USER_TABLE_NAME).where({
            id: payload.sub
        }).select('id');

        // If user doesn't exists, handle it
        if (user.length === 0) {
            return done(null, false);
        }

        done(null, user);
    } catch (e) {
        done(null, false);
    }

}));

//Local strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    console.log(email);
    console.log(password);
    //
    const user = await knex(USER_TABLE_NAME).where({
        email: email
    }).select('*');
    console.log(user)
    if (user.length === 0) {
        return done(null, false);
    }
    const isMatch = await isPasswordValidate(password, user[0].password);

    console.log('isvalid',isMatch)
    // If not, handle it
    if (!isMatch) {
        return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
}))