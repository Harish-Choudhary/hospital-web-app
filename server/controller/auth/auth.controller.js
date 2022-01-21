const db = require("../../db/db");
//using this for hashing password
const { hashSync, genSaltSync, compareSync} = require ('bcrypt');
//using this for cookies purpose
const { sign , verify } = require('jsonwebtoken');
const nodeMailer = require("nodemailer");
exports.signUp = (req,res) =>{

    const { userEmail, userPassword, userName , userPhone, userCity } = req.body;
    console.log({ userEmail, userPassword, userName , userPhone, userCity })
    //this is hash algorithm
    const salt = genSaltSync(10);
    //password is hashed.
    const hashedPassword = hashSync(userPassword,salt);
    console.log(hashedPassword)

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
               db.query('insert into users set email=?,name=?,phone=?,password=?,userCity=?',[userEmail,  userName , userPhone ,hashedPassword,userCity
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


                       res.cookie("AuthToken",userToken,{
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


                    res.cookie("AuthToken",userToken,{
                        expires : new Date(Date.now() + 86400000)
                    })


                    res.send({
                        msg:"login successfully",
                        code : 1
                    })

                }
                else{

                    res.send({
                        msg:'Username or password is incorrect',
                        code : 0
                    })
                }
        }
        else{

            res.send({
                msg: 'Email not found. Try to register',
                code:2
            })
        }
          
    })
 }



 exports.verifyEmail = (req,res) =>{

    const OTP = String(Math.floor(100000 + Math.random()*899999));
    // math.random return between 0 and 1 => 1
    const salt = genSaltSync(10);
    const hashedotp = hashSync(OTP,salt);
    

    console.log(OTP);
    const {userEmail} = req.body;
    const transporter = nodeMailer.createTransport({

        service:"gmail",
        auth: {
            user:"darshanshah3010@gmail.com",
            pass:"zadquwvvwcqzwtnm"
        }
    })

    const template = {
            from:"HealthAura <darshanshah3010@gmail.com>" ,
            to:userEmail,
            subject:"Email verification",
            html: 
            `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                        <div style="margin:50px auto;width:90%;padding:20px 0">
                          <div style="border-bottom:1px solid #eee">
                            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">HealthAura</a>
                          </div>
                          <p style="font-size:1.1em">Hi,</p>
                          <p>Below is your 6 digit verification code for changing password, Make sure you do not share this OTP with anyone.</p>
                          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                          <p style="font-size:0.9em;">Regards,<br />HealthAura</p>
                          <hr style="border:none;border-top:1px solid #eee" />
                          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                            <p>HealthAura</p>
                            <p>Pune, Maharashtra</p>
                            <p>India</p>
                          </div>
                        </div>
                      </div>`
    }

    transporter.sendMail(template,(err,success)=>{

        if(err){

            console.log(err)
            res.send({
                msg:"Something went wrong while sending the mail",
                code: -1,
                err: err
            })
        }
        else{
           
            db.query(`insert into usersverification set email= ? , otp=?`,[userEmail,hashedotp],(err,success)=>{
                if(err)
                {
                    res.send({
                        msg:"Something went wrong in inserting",
                        code: -1,
                        err: err
                    })
                }
                else
                {
                    res.send({
                        code :1
                    })
                }
            });
        }
    })
}


exports.verifyOtp = (req,res)=>{
    const {userEmail , OTP} = req.body;
    
    
    db.query('select otp from usersverification where email =?',[userEmail],(err,succ)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(compareSync(OTP,succ[succ.length-1].otp))
            { 
                // once matched remove database entry for that email
                db.query('delete from usersverification where email = ?',[userEmail],(err,succ)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log('verified successfully');
                        res.send({
                            msg : 'verified successfully',
                            code : 1
                        })
                    }
                })
            }
            else
            {
                console.log('incorrect otp');
                res.send({
                    msg : 'incorrect otp',
                    code : 0
                })
            }
        }
    })
}


exports.checkIsLogin = (req,res) =>{
    console.log('this is signup page');
}