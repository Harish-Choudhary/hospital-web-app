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
  db.query(
    "insert into appointment set userName = ?, userEmail = ?, appointmentFor = ?, hospitalId = ?, doctorName = ?, appointmentDate = ?, appointmentTime = ?",
    [
      userName,
      userEmail,
      treatmentFor,
      req.params.hospitalId,
      selectedDoctor,
      appointmentDate,
      appointmentTime,
    ],
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          code: 1,
          msg: "Appointment has confirmed, Mail has been sent to your registered account, Soon you will receive confirmation mail",
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
        res.send({data: data});
      }
    }
  );
};
