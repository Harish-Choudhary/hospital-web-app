import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminHeader } from "../../../components/admin/header/header";
import { SideBar } from "../../../components/admin/sidebar/sidebar.component";
import "./showdoctor.styles.css";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const ShowDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/dashboard/hospital/show/doctor", {
      withCredentials: true,
    })
      .then((res) => {
        setDoctors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(doctors);

  const navigate = useNavigate();

  const redirectToAddDoctor = () => {
    navigate({
      pathname: "/hospital/dashboard/add/doctor",
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="adminLeft">
        <SideBar active={"Show Doctors"} />
      </div>
      <div className="adminRight" style={{ width: "82%" }}>
        <AdminHeader />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "20px",
            color: "#333",
          }}
        >
          <h2>All Doctors</h2>
          <Button
            sx={{ zIndex: 0 }}
            onClick={redirectToAddDoctor}
            endIcon={<ArrowRightAltRoundedIcon />}
          >
            Add Doctor
          </Button>
        </div>

        <div className="doctorsList">
          {doctors.map((doctor) => (
            <div key={doctor.name} className="singleDoctorBox">
              <div className="imgAndName">
                <Avatar alt="Rahul Nikam" src={`/uploads/${doctor.photo}`} />
                <p>Dr. {doctor.name}</p>
              </div>
              <div className="doctorBio">
                <p>
                  {doctor.bio.substring(0,200)}
                </p>
              </div>
              <div className="singleDocBoxActions">
                <Button sx={{ marginTop: "10px" }} endIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/*
    name
    photo
    bio
    phone
*/