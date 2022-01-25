const {verify} = require('jsonwebtoken')
const db = require('../db/db')

exports.isAdmin = (req ,res)=>{
    const userToken = req.cookies.AuthToken
    
    if(userToken)
    {
        verify(userToken , process.env.secretKey ,(err, succ)=>{
            if(err)
            {
                res.send({
                    isLogin:false
                })
            }
            else
            {
                if(succ.hospitalId){
                    db.query('select * from hospital_registration where hospital_registration_nos = ?',[succ.hospitalId],(err,data)=>{
                        if(err)
                            console.log(err);
                        else{
                            // let newData = data[0].slice(0,data[0].length-1);
                            const {hospital_registration_nos, hospital_name , city, pincode, about, tags, contact_nos, iframe, image} = data[0];
                            res.send({
                                data: [hospital_registration_nos, hospital_name , city, pincode, about, tags, contact_nos, iframe, image],
                                isAdmin:true
                            })


                        }
                    })
                }
                else if(succ.userEmail){
                    res.send({
                    email: succ.userEmail,
                    isAdmin:false,
                    code : 0,
                    redirectTo : "/home"
                    })
                }
               
            }
        })
    }
    else
    {
        res.send({
            isLogin:false
        })
    }
    console.log(userToken)
}