import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminHeader } from "../../../components/admin/header/header";
import { SideBar } from "../../../components/admin/sidebar/sidebar.component";
import "./appointments.css";
import doctorImg from "../../../images/medical-team.png";
import dateImg from "../../../images/calendar (1).png";
import timeImg from "../../../images/back-in-time.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const Appointments = () => {
  const [doctorImage, setDoctorImage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [hospitalId, setHospitalId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/checkIsLogin", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.isLogin) {
        setHospitalId(res.data.id);
      } else {
        navigate("/");
      }
    });

    getAppointments();
  }, []);

  const getAppointments = () => {
    Axios.get(`http://localhost:5000/book/show/appointments/${hospitalId}`, {
      withCredentials: true,
    })
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(appointments);

  return (
    <div className="addDoctorComponent">
      <div className="adminLeft">
        <SideBar active={"Appointments"} />
      </div>

      <div style={{ width: "82%" }} className="adminRight">
        <AdminHeader />
        <div
          style={{
            margin: "20px",
            color: "#333",
          }}
        >
          <h2>All Appointments</h2>

          <div className="appointmentsList">
            {appointments.map((appointment) => (
              <div className="appointmentBox">
                <p className="paitentName">{appointment.userName}</p>
                <div className="appointmentMetaData">
                  <div className="metaDataBox">
                    <img src={doctorImg} alt="" />
                    <p className="doctorName">{appointment.doctorName}</p>
                  </div>

                  <div className="metaDataBox">
                    <img src={dateImg} alt="" />
                    <p className="appointmentDate">{appointment.appointmentDate}</p>
                  </div>

                  <div className="metaDataBox">
                    <img src={timeImg} alt="" />
                    <p className="appointmentTime">{appointment.appointmentTime}</p>
                  </div>
                </div>
                <p className="appointmentFor">
                  {appointment.appointmentFor}
                </p>
                <div className="actions">
                  <Button variant="contained">Confirm</Button>
                  <Button>Message</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
