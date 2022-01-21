const { hashSync,compareSync } = require("bcrypt");
const db = require("../../db/db");

const {sign} = require('jsonwebtoken');

// Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.


exports.hospitalRegn = (req,res) => {
    const { hospitalId, hospitalName, adminName, hospitalCity, hospitalPin, hospitalPassword, hospitalBio, hospitalTags, hospitalContact, hospitalIframe } = req.body;
    const hashedPassword = hashSync(hospitalPassword, 10);
    db.query('select * from hospital_registration where hospital_registration_nos = ?', [hospitalId], (err, succ) => {
        if (err) {
            console.log(err);
        }
        else {
            if (succ.length == 0) {
                db.query('insert into hospital_registration set hospital_registration_nos=?,user_name=?,hospital_name=?,contact_nos=?,password=?,tags=?,city=?,pincode=?,about=?,iframe=?',[hospitalId,adminName,hospitalName,hospitalContact,hashedPassword,hospitalTags,hospitalCity,hospitalPin,hospitalBio,hospitalIframe],(err,succ)=>{
                    if (err) {
                        console.log(err);
                    }
                    else
                    {
                        //cookies of hospital
                        const hospitalAuthToken = sign({
                            hospitalId : hospitalId
                        },process.env.secretKey,{
                            expiresIn : '24h'
                        })
                        res.cookie('AuthToken',hospitalAuthToken,{expires : new Date(Date.now() + 86400000)});

                        res.send({
                            code : 1,
                            msg : 'hospital added successfully'
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


exports.hospitalLogin = (req,res) =>{

    const {hospitalId, hospitalPassword} = req.body;

    db.query('select * from hospital_registration where hospital_registration_nos = ?',[hospitalId],(err,data)=>{

            if(err){
                    console.log(err);
            }
            else if(data.length == 1)
            {
    
                    let comparePassword  = compareSync(hospitalPassword,data[0].password);
    
                    //if password matches
                    if(comparePassword == true){
                        
                        //generate the token and set cookie for the user session
                        const hospitalAuthToken = sign({
                            hospitalId : hospitalId
                        },process.env.secretKey,{
                            expiresIn : '24h'
                        })
    
    
                        res.cookie("AuthToken",hospitalAuthToken,{
                            expires : new Date(Date.now() + 86400000)
                        })
    
    
                        res.send({
                            msg:"login successfully to hospital dashboard",
                            code : 1
                        })
    
                    }
                    else{
    
                        res.send({
                            msg:'Hospital id or password is incorrect',
                            code : 0
                        })
                    }
            }
            else{
    
                res.send({
                    msg: 'Hospital not found. Try to register',
                    code:2
                })
            }

    });
}