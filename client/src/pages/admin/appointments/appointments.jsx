import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminHeader } from "../../../components/admin/header/header";
import { SideBar } from "../../../components/admin/sidebar/sidebar.component";
import "./appointments.css";
import doctorImg from "../../../images/medical-team.png";
import dateImg from "../../../images/calendar (1).png";
import timeImg from "../../../images/back-in-time.png";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const Appointments = () => {
  const [doctorImage, setDoctorImage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [hospitalId, setHospitalId] = useState("");
  const [email, setEmail] = useState("");
  const [clickedAppointEmail, setClickedAppointEmail] = useState("");
  const [status, setStatus] = useState("pending");


  const navigate = useNavigate();

  let { id } = useParams();

  // console.log("paramsssss", id);

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/checkIsLogin", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.isLogin) {
        setHospitalId(res.data.id);
        setEmail(res.data.email)
      } else { 
        navigate("/");
      }
    });

    Axios.get(`http://localhost:5000/book/show/appointments/${id}`, {
      withCredentials: true,
    })
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get("http://localhost:5000/auth/checkIsLogin", {
      withCredentials: true,
    }).then((res) => {
      if (!res.data.isLogin) {
        navigate("/");
      }
    });
  }, []);



  console.log(appointments);

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
                <p className="appointmentFor">{appointment.appointmentFor}</p>
                <div className="actions">
                  {
                    console.log("asdasdasdasdasdasd", appointment.userEmail)
                  }
                  <Button variant="contained" onClick={() => {
                    Axios.get(`http://localhost:5000/book/confirm/appointment/${appointment.userEmail}`,{
                      withCredentials: true,
                    })
                      .then((res) => setStatus(res.data.status))
                      .catch((err) => {
                        console.log(err);
                      });
                  }}>
                    {appointment.status === "confirm" ? "Booked" : "Confirm"}
                  </Button>
                  {
                    appointment.pdf.length != 0 ? <Button href={`http://localhost:3000/pdfs/${appointment.pdf}`} target="_blank">Open PDF</Button> : null
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
