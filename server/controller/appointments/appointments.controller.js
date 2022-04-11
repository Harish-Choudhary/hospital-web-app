const db = require("../../db/db");

exports.bookAppointment = (req, res) => {
  const {
    userName,
    treatmentFor,
    selectedDoctor,
    appointmentDate,
    appointmentTime,
    userEmail,
  } = req.body;

  const pdf = req.file.filename;
  console.log(pdf)

  db.query(
    "insert into appointment set userName = ?, userEmail = ?, appointmentFor = ?, hospitalId = ?, doctorName = ?, appointmentDate = ?, appointmentTime = ?, pdf = ?",
    [
      userName,
      userEmail,
      treatmentFor,
      req.params.hospitalId,
      selectedDoctor,
      appointmentDate,
      appointmentTime,
      pdf
    ],
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          code: 1,
          msg: "Appointment is in process, Soon you will receive confirmation mail",
        });
      }
    }
  );
};

exports.showAppointments = (req, res) => {
  db.query(
    "select * from appointment where hospitalId = ?",
    [req.params.hospitalId],
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ data: data });
      }
    }
  );
};

exports.confirmAppointment = (req, res) => {
  console.log(req.params.userEmail)
  db.query(
    "update appointment set status = ? where userEmail = ?",
    ["confirm", req.params.userEmail],
    (err, data) => {
      if(err){
        res.send({
          code:1,
          status: "Confirm"
        })
      }
      else{
        res.send({
          code:0,
          status: "Confirm"
        })
      }
    }
  );
};


exports.getAppointmentsHistory = (req,res) =>{
  const userEmail = req.params.userEmail;
  console.log(userEmail);

  db.query("select * from appointment where userEmail = ?", [userEmail], (err,data) => {
    if(err)
    {
      console.log(err);
    }
    else{
      res.send(data)
    }
  })
}