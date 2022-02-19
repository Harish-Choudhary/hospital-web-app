const { hashSync, compareSync } = require("bcrypt");
const db = require("../../db/db");
const path = require("path")

// To be deleted....
const fileUpload = require('express-fileupload')
const { sign } = require('jsonwebtoken');
const {verify } = require('jsonwebtoken')
const fs = require('fs');




exports.hospitalRegn = (req, res) => {
    // console.log(req)
    const hospitalImg = req.file.filename;

    const { hospitalId, hospitalName, adminName, hospitalCity, hospitalPin, hospitalPassword, hospitalBio, hospitalTags, hospitalContact } = req.body;
    // console.log(hospitalBio)
    const hashedPassword = hashSync(hospitalPassword, 10);

    db.query('select * from hospital_registration where hospital_registration_nos = ?', [hospitalId], (err, succ) => {
        if (err) {
            console.log(err);
        }
        else {
            if (succ.length == 0) {

                db.query('insert into hospital_registration set hospital_registration_nos=?,user_name=?,hospital_name=?,contact_nos=?,password=?,tags=?,city=?,pincode=?,iframe=?,about=?, image=?', [hospitalId, adminName, hospitalName, hospitalContact, hashedPassword, hospitalTags, hospitalCity, hospitalPin,"1345", hospitalBio,hospitalImg], (err, succ) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        //cookies of hospital
                        const hospitalAuthToken = sign({
                            hospitalId: hospitalId
                        }, process.env.secretKey, {
                            expiresIn: '24h'
                        })
                        res.cookie('AuthToken', hospitalAuthToken, { expires: new Date(Date.now() + 86400000) });
                fs.mkdirSync(path.join(__dirname+`../../../../client/public/hospital/${hospitalId}`));
                        
                        res.send({
                            code: 1,
                            msg: 'hospital added successfully'
                        });
                    }
                })
            }
            else {

                res.send({
                    msg: "hospital already exists!",
                    code: 0
                });

            }
        }
    })
}


exports.hospitalLogin = (req, res) => {

    const { hospitalId, hospitalPassword } = req.body;

    db.query('select * from hospital_registration where hospital_registration_nos = ?', [hospitalId], (err, data) => {

        if (err) {
            console.log(err);
        }
        else if (data.length == 1) {

            let comparePassword = compareSync(hospitalPassword, data[0].password);

            //if password matches
            if (comparePassword == true) {

                //generate the token and set cookie for the user session
                const hospitalAuthToken = sign({
                    hospitalId: hospitalId
                }, process.env.secretKey, {
                    expiresIn: '24h'
                })


                res.cookie("AuthToken", hospitalAuthToken, {
                    expires: new Date(Date.now() + 86400000)
                })

                
                res.send({
                    msg: "login successfully to hospital dashboard",
                    code: 1
                })

            }
            else {

                res.send({
                    msg: 'Hospital id or password is incorrect',
                    code: 0
                })
            }
        }
        else {

            res.send({
                msg: 'Hospital not found. Try to register',
                code: 2
            })
        }

    });
}

// Adding new doctors
exports.hospitalAddDoctor = (req, res) => {

    console.log(req);
    const hospitalToken = req.cookies.AuthToken
    let hospitalRegNo = "";
    if(hospitalToken){
        verify(hospitalToken, process.env.secretKey, (err,token) => {
            if(err){
                console.log(err)
            }
            else{
                hospitalRegNo = token.hospitalId;
            }
        })
    }
    // regno 	name 	tag 	phone 	bio photo

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3NwaXRhbElkIjoiMTIzNDU2IiwiaWF0IjoxNjQzMjIxNjU0LCJleHAiOjE2NDMzMDgwNTR9.qkq3cX01K_2cPbul5gHjUiEvD4aIweedv4zNee1HiGk

    const {  doctorName ,  doctorTags , doctorPhone, doctorInfo } = req.body;
    
    db.query('insert into doctors set regno=?,name=?,tag=?,phone=?,bio=?,photo=?', [hospitalRegNo, doctorName, doctorTags, doctorPhone, doctorInfo, req.file.filename], (err, succ) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send({
                            code: 1,
                            msg: 'doctor added successfully'
                        });
                    }
                })
           
}

exports.showDoctorsList=(req,res)=>{
    const hospitalToken = req.cookies.AuthToken;
    let hospitalRegNo = "";
    if(hospitalToken){
        verify(hospitalToken, process.env.secretKey, (err,token) => {
            if(err){
                console.log(err)
            }
            else{
                hospitalRegNo = token.hospitalId;
                db.query('select * from doctors where regno=?',[hospitalRegNo],(err,doctorsData)=>{
                    if(err)
                    {
                        console.log(err)
                        res.send({
                            msg : "error"
                        })
                    }
                    else
                    {
                        res.send({
                            data : doctorsData,
                            code: 1
                        })
                        // console.log(doctorsData)
                    }
                });
            }
        })
    }
}






// {
       
//     "regno" : "123",
//     "name":"darshan",
//     "tag":"covid",
//     "phone":"123456678",
//     "bio":"Specialist"
    
    
// }