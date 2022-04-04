const db = require("../../db/db")

exports.getAllHospitalsData = (req,res) => {
    db.query('select * from hospital_registration', (err, data) => {
        if(err){
            res.sendStatus(500)
        }
        else{
            for(let i = 0; i<data.length; i++){
                delete data[i].password
            }
            res.send({
                code: 1,
                data: data
            }).status(200)
        }
    })
}

exports.getSingleHospitalsData = (req,res) => {
    const {hospitalId} = req.params;
    db.query("select * from hospital_registration where hospital_registration_nos = ?", [hospitalId], (err,data) => {
        if(err){
            console.log(err)
            res.send("Server Error, Try again")
        }
        else{
            for(let i = 0; i<data.length; i++){
                delete data[i].password;
            }
            db.query('select * from doctors where regno = ?', [hospitalId], (err,doctorsData) => {
                if(err){
                    console.log(err)
                    res.send("Server Error, Try again")
                }
                else{
                    res.send({
                        code: 1,
                        data: data,
                        doctorsData: doctorsData
                    })
                }
            })
            
        }
    })
}