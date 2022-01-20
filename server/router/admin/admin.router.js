const Router = require('express').Router()
const controller = require('../../controller/admin/admin.controller')


Router.post('/register',controller.hospitalRegn);
Router.post('/login',controller.hospitalLogin);


module.exports = Router;