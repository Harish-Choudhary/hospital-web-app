const Router = require('express').Router()
const controller = require('../../controller/admin/admin.controller')
const {isAdmin} = require('../../auth/isAdmin')
const multer = require('multer')
const { verify } = require("jsonwebtoken")

console.log(`${__dirname}`)
const fs = require('fs');



let storage = multer.diskStorage({
    destination : function (req,file,callBack){
        callBack(null,'../client/public/uploads');
    },
    filename : function(req,file,callBack)
    { 
        callBack(null,file.originalname)
    }
})

let upload = multer({
    storage:storage
})

function getToken(token){
    let retvalue = 0;
    verify(token,process.env.secretKey,(err,decoded)=>{
        if(err)
            console.log(err);
        else
        {
            console.log("hosid ====>    "+decoded.hospitalId)
            retvalue = decoded.hospitalId;
        }
    })

    return retvalue;
}

let doctorStorage = multer.diskStorage({
    destination : function (req,file,callBack){
        let token = getToken(req.cookies.AuthToken);
        console.log("token ====>    "+token)
        callBack(null,`../client/public/hospital/${token}`);
    },
    filename : function(req,file,callBack)
    { 
        callBack(null,file.originalname)
    }
})

let doctorImageUpload = multer({
    storage : doctorStorage
})

Router.post('/register',upload.single('file'),controller.hospitalRegn);
Router.post('/login',controller.hospitalLogin);
Router.post('/add/doctor', doctorImageUpload.single('file') ,controller.hospitalAddDoctor);
Router.get('/show/doctor',controller.showDoctorsList);
// Router.get('/show/appointments',controller.showAdminAppointmentList);
Router.get('/isadmin',isAdmin);

module.exports = Router;




