import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header/header";
import doctorImg from "../../../images/medical-team.png";
import dateImg from "../../../images/calendar (1).png";
import timeImg from "../../../images/back-in-time.png";
import { Avatar, Button } from "@mui/material";


export const ProfilePage = ({ email }) => {
  const [userEmail, setUserEmail] = useState("");
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/checkIsLogin", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.isLogin) {
        setUserEmail(res.data.email);
      } else {
        navigate("/");
      }
    });

    Axios.get(`http://localhost:5000/auth/getUserData/${userEmail}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get(`http://localhost:5000/book/get/appointment/history/${userEmail}`)
      .then((res) => {
        setAppointmentHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

  console.log(appointmentHistory);

  return (
    <div>
      <Header />

      {userData.map((data) => (
        <h2  style={{
          maxWidth: "80%",
          margin: "auto"
        }}>Hello, {data.name}</h2>
      ))}
      <div  style={{
      maxWidth: "80%",
      margin: "auto"
    }} className="appointmentsList">
        {appointmentHistory.map((appointment) => (
          <div key={appointment.userEmail} className="appointmentBox">
            <p className="paitentName">{appointment.userName}</p>
            <div className="appointmentMetaData">
              <div className="metaDataBox">
                <img src={doctorImg} alt="" />
                <p className="doctorName">{appointment.doctorName}</p>
              </div>

              <div className="metaDataBox">
                <img src={dateImg} alt="" />
                <p className="appointmentDate">
                  {appointment.appointmentDate}
                </p>
              </div>

              <div className="metaDataBox">
                <img src={timeImg} alt="" />
                <p className="appointmentTime">
                  {appointment.appointmentTime}
                </p>
              </div>
            </div>
            <p className="appointmentFor">
              {appointment.appointmentFor}
            </p>
            {appointment.pdf.length != 0 ? (
              <Button
                href={`http://localhost:3000/pdfs/${appointment.pdf}`}
                target="_blank"
              >
                Open PDF
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
