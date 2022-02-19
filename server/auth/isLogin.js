const {verify} = require('jsonwebtoken')
const db = require('../db/db')

// Authtoken Authtoken -> identification
// user => email'l
// 134324

exports.isLogin = (req ,res)=>{
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
                    res.send({
                        id: succ.hospitalId,
                        isLogin:true
                    })
                }
                else if(succ.userEmail){
                    res.send({
                    email: succ.userEmail,
                    isLogin:true
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
    // console.log(userToken)
}


