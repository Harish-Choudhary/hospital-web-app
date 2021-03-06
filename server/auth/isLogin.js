const { verify } = require("jsonwebtoken");
const db = require("../db/db");

// Authtoken Authtoken -> identification
// user => email'l
// 134324 `

exports.isLogin = (req, res) => {
  const userToken = req.cookies.AuthToken;
  if (userToken) {
    verify(userToken, process.env.secretKey, (err, succ) => {
      if (err) {
        res.send({
          isLogin: false,
        });
      } else {
        if (succ.hospitalId) {
          db.query(
            "select * from hospital_registration where hospital_registration_nos = ?",
            [succ.hospitalId],
            (err, hospital) => {
              if (err) {
                console.log(err);
              } else {
                res.send({
                  id: hospital[0].hospital_registration_nos,
                  name: hospital[0].hospital_name,
                  img: hospital[0].image,
                  isLogin: true,
                });
              }
            }
          );
        } else if (succ.userEmail) {
          db.query(
            "select * from users where email = ?",
            [succ.userEmail],
            (err, user) => {
              if (err) {
                console.log(err);
              } else {
                res.send({
                  email: user[0].email,
                  name: user[0].name,
                  img: user[0].image,
                  isLogin: true,
                });
              }
            }
          );
        }
      }
    });
  } else {
    res.send({
      isLogin: false,
    });
  }
};

exports.getUserData = (req, res) => {
  const userEmail = req.params.userEmail;
  db.query("select * from users where email = ?", [userEmail], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
};

exports.getHospitalData = (req, res) => {
  const hospitalId = req.params.hospitalId;
  db.query(
    "select * from hospital_registration where hospital_registration_nos = ?",
    [hospitalId],
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
};

exports.deleteHospital = (req, res) => {
  const hospitalId = req.params.hospitalId;
  console.log(hospitalId)
  // db.query(
  //   "delete from hospital_registration where hospital_registration_nos = ?",
  //   [hospitalId],
  //   (err, data) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(data);
  //       res.clearCookie("AuthToken");
  //       res.redirect("/");
  //     }
  //   }
  // );
};
