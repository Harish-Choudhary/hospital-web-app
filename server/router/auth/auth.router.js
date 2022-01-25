const router = require('express').Router();
const e = require('express');
const controller = require('../../controller/auth/auth.controller.js');
const {isLogin} = require('../../auth/isLogin')

router.post('/signup',controller.signUp);
router.post('/signin', controller.signIn);
router.post('/verify/email',controller.verifyEmail);
router.post('/verify/otp',controller.verifyOtp);
router.get('/checkIsLogin',isLogin);
module.exports = router;

