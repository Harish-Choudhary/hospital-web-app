const {verify} = require('jsonwebtoken')
const db = require('../db/db')


exports.isLogin = (req ,res)=>{
    const userToken = req.cookies.userToken
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
                const userEmail = succ.userEmail
                db.query('select * from users where email=?',[userEmail],(err , succ)=>{
                    if(err)
                    {
                        res.send({
                            isLogin:false
                        })
                    }
                    else if(succ.length == 0)
                    {
                        res.send({
                            isLogin:false
                        })
                    }
                    else
                    {
                        res.send({
                            isLogin:true
                        })
                    }
                })
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

