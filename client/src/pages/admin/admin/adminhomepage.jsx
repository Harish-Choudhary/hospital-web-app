import React, { useEffect } from "react";
import { AdminHeader } from "../../../components/admin/header/header";
import { SideBar } from "../../../components/admin/sidebar/sidebar.component";
import "./adminHome.styles.css";
import doctorImage from "../../../images/medical-team.png";
import completedAppointmentsImage from "../../../images/completed-task.png";
import appointmentsImage from "../../../images/deadline.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminHomePage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    Axios.get('http://localhost:5000/auth/checkIsLogin',{withCredentials : true}).then(res=>{
        if(!res.data.isLogin)
        {
            navigate('/');
        }
    })
    
}, [])


  const totalAppointments = 6;
  const compAppointment = 2;
  const compAppointmentPercentage = (compAppointment/totalAppointments)*100;

  return (
    <div style={{ display: "flex" }}>
      <div className="adminLeft">
        <SideBar active={"Dashboard"} />
      </div>
      <div style={{ width: "82%" }} className="adminRight">
        <AdminHeader />

        <div className="mainDasboard">
          <div className="quickOverView">
            <div className="singleOverViewBox">
              <div className="leftAreaOA">
                <p>Total Doctors</p>
                <p className="number">2</p>
              </div>
              <div className="rightAreaOA">
                <img src={doctorImage} alt="" />
              </div>
            </div>

            <div className="singleOverViewBox">
              <div className="leftAreaOA">
                <p>Total Appointments</p>
                <p className="number">2</p>
              </div>
              <div className="rightAreaOA">
                <img src={appointmentsImage} alt="" />
              </div>
            </div>

            <div className="uniquesingleOverViewBox">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="leftAreaOA">
                  <p>Completed Appointments</p>
                  <p className="number">2</p>
                </div>
                <div className="rightAreaOA">
                  <img src={completedAppointmentsImage} alt="" />
                </div>
              </div>
              <div>
                <div className="outerLightArea">
                  <div
                    style={{ width: `${compAppointmentPercentage}%` }}
                    className="innerDarkArea"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
