const router = require('express').Router();
const e = require('express');
const controller = require('../../controller/auth/auth.controller.js');

router.post('/signup',controller.signUp);
router.post('/signin', controller.signIn);
router.post('/verify/email',controller.verifyEmail);

module.exports = router;