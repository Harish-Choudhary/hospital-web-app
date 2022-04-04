import React, { useState, useEffect } from "react";
import "./app.css";
import { AuthPage } from "./pages/auth/user.auth/auth.page";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/home";
import { SettingPage } from "./pages/admin/settings/settings.jsx";
import { AdminHomePage } from "./pages/admin/admin/adminhomepage.jsx";
import { AddDoctor } from "./pages/admin/adddoctor/adddoctor.jsx";
import { ShowDoctors } from "./pages/admin/showdoctor/showdoctor.jsx";
import { HospitalListingPage } from "./pages/users/Hospital/hospitalListing.page";
import { SingleHospitalPage } from "./pages/users/singleHospital/singleHospital.page";
import Axios from "axios";
import { createContext } from "react";
import { Appointments } from "./pages/admin/appointments/appointments";
import { AdminSignUpPage } from "./pages/auth/admin.auth/admin.auth";

export const ContextApi = createContext();

export const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [hospitalId, setHospitalId] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:5000/auth/checkIsLogin", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.isLogin) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, [setIsLogin]);

  const data = {
    isLogin: isLogin
  };

  return (
    <>
      <ContextApi.Provider value={data}>
        <Routes>
          <Route path="/register/hospital" element={<AdminSignUpPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/hospitals" element={<HospitalListingPage />} />
          <Route
            path="/hospitals/:hospitalId"
            element={<SingleHospitalPage />}
          />

          <Route path="/hospital/dashboard" element={<AdminHomePage />} />
          <Route
            path="/hospital/dashboard/add/doctor"
            element={<AddDoctor />}
          />
          <Route
            path="/hospital/dashboard/show/doctors"
            element={<ShowDoctors />}
          />
          <Route
            path="/hospital/dashboard/appointments"
            element={<Appointments />}
          />
          <Route
            path="/hospital/dashboard/settings"
            element={<SettingPage />}
          />
        </Routes>
      </ContextApi.Provider>
    </>
  );
};
