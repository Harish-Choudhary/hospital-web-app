const Router = require('express').Router()
const controller = require('../../controller/admin/admin.controller')
const {isAdmin} = require('../../auth/isAdmin')
const multer = require('multer')

console.log(`${__dirname}`)

let storage = multer.diskStorage({
    destination : function(req,file,callBack){
        callBack(null,'../client/public/uploads')
    },
    filename : function(req,file,callBack)
    {
        
        callBack(null,file.originalname)
    }

    // 
})
let upload = multer({
    storage:storage
})


Router.post('/register',upload.single('file'),controller.hospitalRegn);
Router.post('/login',controller.hospitalLogin);
Router.post('/add/doctor',controller.hospitalAddDoctor);
Router.get('/isadmin',isAdmin);
module.exports = Router;




