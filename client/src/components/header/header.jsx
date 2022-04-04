import React, { useState, useEffect } from "react";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Avatar from '@mui/material/Avatar';

import "./header.css";
export const Header = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUsername] = useState("");
const [userImg, setUserImg] = useState("")

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/checkIsLogin", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.isLogin) {
        setIsLogin(true);
        setUsername(res.data.name);
        setUserImg(res.data.img)
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  const changeToSignUp = () => {
    navigate("/signup");
  };

  const redirectToHospitalsPage = () => {
    navigate("/hospitals");
  };

  const redirectToHomePage = () => {
    navigate("/");
  };
  console.log(userImg)

  return (
    <div className="header">
      <div className="logo">
        <h1 onClick={redirectToHomePage}>HealthAura</h1>
      </div>
      <div className="right-header">
        <p onClick={redirectToHospitalsPage}>Hospitals</p>
        <p>About Us</p>
        <p>Contact</p>
        <div className="profile">
          {isLogin ? (
            <div style={{display: "flex", alignItems: "center"}}>
              <p
                style={{
                    color: "#2774f8",
                    fontWeight: "500",
                    cursor: "pointer",
                }}
              >
                {userName}
              </p>
              {
                  userImg ? <Avatar sx={{marginLeft: "10px"}} alt="Remy Sharp" src={`/userImages/${userImg}`} /> : <Avatar alt="Remy Sharp" sx={{marginLeft: "10px"}}>{userName.toString()[0]}</Avatar>
              }
                
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#475bd8" }}
                onClick={changeToSignUp}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};