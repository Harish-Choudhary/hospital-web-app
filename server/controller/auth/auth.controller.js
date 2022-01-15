const db = require("../../db/db");
//using this for hashing password
const { hashSync, genSaltSync, compareSync} = require ('bcrypt');
//using this for cookies purpose
const { sign , verify } = require('jsonwebtoken');

exports.signUp = (req,res) =>{

    const { userEmail, userPassword, userName , userPhone } = req.body;
    //this is hash algorithm
    const salt = genSaltSync(10);
    //password is hashed.
    const hashedPassword = hashSync(userPassword,salt);

    //check for duplicate email while registering
    db.query('select * from users where email = ?',[userEmail],(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            
            if(data.length==0)
            {
               db.query('insert into users set email=?,name=?,phone=?,password=?',[userEmail,  userName , userPhone ,hashedPassword
            ],(err,data)=>{
                   if(err)
                   {
                       console.log(err);
                   }
                   else
                   {
                       const userToken = sign({
                           userEmail : userEmail
                       },process.env.secretKey,{
                           expiresIn : '24h'
                       })


                       res.cookie("userToken",userToken,{
                           expires : new Date(Date.now() + 86400000)
                       })


                       res.send({
                           msg:"user added successfully",
                           code : 1
                       })


                   }
                      
               })
            }
            else
            {
                res.send({
                    msg : "user already exists!",
                    code : 0
                });
            }

        }
    });

}

//install bcrypt=> for hashing passwords

exports.signIn = (req,res) =>{

    const { userEmail, userPassword } = req.body;

    //fetch the data for the user using userEmail
    //write databse query to see if email and password exists
    
    db.query('select * from users where email = ?',[userEmail],(err,data)=>{
        
        if(err){

            console.log(err);
        }
        else if(data.length==1)
        {

                let comparePassword  = compareSync(userPassword,data[0].password);

                //if password matches
                if(comparePassword == true){
                    
                    //generate the token and set cookie for the user session
                    const userToken = sign({
                        userEmail : userEmail
                    },process.env.secretKey,{
                        expiresIn : '24h'
                    })


                    res.cookie("userToken",userToken,{
                        expires : new Date(Date.now() + 86400000)
                    })


                    res.send({
                        msg:"login successfully",
                        code : 1
                    })

                }
                else{

                    res.send({
                        msg:'username or password is incorrect',
                        code : 0
                    })
                }
        }
        else{

            res.send({
                msg: 'email not found try to register',
                code:2
            })
        }
          
    })
 }