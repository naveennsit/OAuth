const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConfig = require('../passport')
const controller = require('../controller/users');
const routerHelper = require('../helper/router.helper');
const passportJWT = passport.authenticate('jwt', { session: false });
const passportSignIn = passport.authenticate('local', { session: false });


router.route('/signup',)
    .post(routerHelper.validateSinUpRequest(), controller.signUp)

router.route('/signin')
    .post(passportSignIn,controller.signIn)

router.route('/secret')
    .get(passportJWT,controller.secret)


module.exports = router;

