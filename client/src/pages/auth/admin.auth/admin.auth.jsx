import React, { useState, useEffect } from "react";
// import {AdminSignup} from '../../../components/admin/adminSignup/adminSignup'
import { AdminLogin } from "../../../components/admin/auth/adminLogin/adminLogin.jsx";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin.auth.css";
import { AdminSignup } from "../../../components/admin/auth/adminSignup/adminSignup.jsx";

export const AdminSignUpPage = () => {
  const [showAdminSignup, setAdminSignup] = React.useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/checkIsLogin", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.isLogin) {
        navigate("/dashboard");
      }
    });
  }, []);

  const showAdminSignIn = () => {
    setAdminSignup(!showAdminSignup);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="adminAuth">
      <div className="adminAuthForm">
        {showAdminSignup ? <AdminSignup /> : <AdminLogin />}
        <p>
          {showAdminSignup
            ? "Already have an account?"
            : "Don't have an account ? "}{" "}
          <span
            onClick={showAdminSignIn}
            style={{ color: "#2774f8", cursor: "pointer" }}
          >
            {showAdminSignup ? "Hospital Login" : "Register Hospital"}
          </span>
        </p>
      </div>
    </div>
  );
};
