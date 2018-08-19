const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')


const knex = require('../utitlity/db');

const {USER_TABLE_NAME, JWT_SECRET} = require('../utitlity/util');

const signToken = id => {
    return JWT.sign({
        iss: 'CodeWorkr',
        sub: id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
}

const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(password, salt);
    // Re-assign hashed version over original, plain text password
    return passwordHash;
}

module.exports = {
    signUp: async (req, res, next) => {
        console.log(req.body)
        try {
            const user = await knex(USER_TABLE_NAME).where({
                email: req.body.email
            }).select('id');
            console.log("*")
            if (user.length !== 0) {
                return res.status(403).json({error: 'Email is already in use'});
            }

            // generate hash
            req.body.password = await generateHash(req.body.password);

            // save in DB
            const output = await knex(USER_TABLE_NAME).insert({
                email: req.body.email,
                password: req.body.password
            });
            const token = signToken(output);
            //response send
            res.status(201).send({
                status: 200,
                token,
                message: "successfully registered"
            });
        } catch (e) {
            console.log('error');
            res.status(400).send({
                status: 400,
                message: e.sqlMessage
            });
        }

    },
    signIn: async (req, res, next) => {
        console.log('sign In');
        res.json({status: 200})
    },
    secret: async (req, res, next) => {
        console.log('secret');
        res.json({status:200})
    }

}