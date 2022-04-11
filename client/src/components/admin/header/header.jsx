import { Avatar } from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {
  const navigate = useNavigate();

  const [hospitalId, setHospitalId] = useState("");
  const [hospitalData, setHospitalData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/checkIsLogin", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.id) {
        setHospitalId(res.data.id);
      } else {
        navigate("/");
      }
    });

    Axios.get(`http://localhost:5000/auth/get/user/data/${hospitalId}`)
      .then((res) => {
        console.log(res);
        setHospitalData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [hospitalId]);

  const redirectToSettings = () => {
    navigate({
      pathname: "/hospital/dashboard/settings/",
    });
  };

  return hospitalData.map((data) => (
    <div
      onClick={redirectToSettings}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "white",
        padding: "10px 20px 10px 0",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        cursor: "pointer",
        position: "sticky",
        top: "0px",
        zIndex: 10,
      }}
    >
      <p style={{ margin: "0 10px" }}>{data.hospital_name}</p>
      <Avatar alt="Remy Sharp" src={`/uploads/${data.image}`} />
    </div>
  ));
};
