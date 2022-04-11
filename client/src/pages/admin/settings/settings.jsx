import { Avatar, Button, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminHeader } from "../../../components/admin/header/header";
import { SideBar } from "../../../components/admin/sidebar/sidebar.component";
import "./settings.styles.css";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";

const Input = styled("input")({
  display: "none",
});

export const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("generalSettings");
  const [hospitalImage, setHospitalImage] = useState("");
  const [changePasswordDialoug, setChangePasswordDialoug] = useState(false);
  const [cloaseAccountDialoug, setCloaseAccountDialoug] = useState(false);
  const [hospitalId, setHospitalId] = useState("");
  const [hospitalData, setHospitalData] = useState([]);

  const navigate = useNavigate();

  const uploadHospitalImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setHospitalImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

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

  console.log(hospitalId + "alkdlkajsldnlkasjlkjas");


  const closeAccount = () => {
    Axios.get(`http://localhost:5000/auth/delete/hospital/account/${hospitalId}`).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div style={{ display: "flex" }}>
      <div className="adminLeft">
        <SideBar active={"Settings"} />
      </div>
      <div className="adminRight" style={{ width: "82%" }}>
        <AdminHeader />

        <div
          style={{
            margin: "20px",
            color: "#333",
          }}
        >
          <h2>Account Settings</h2>
        </div>
        <div className="accountSettingTabs">
          <div
            onClick={() => setActiveTab("generalSettings")}
            style={
              activeTab == "generalSettings"
                ? {
                    borderBottom: "2px solid #1976d2",
                    color: "#1976d2",
                  }
                : { color: "#757575" }
            }
            className="generalSettings"
          >
            <p>General Settings</p>
          </div>
          <div
            onClick={() => setActiveTab("editHospital")}
            style={
              activeTab == "editHospital"
                ? {
                    borderBottom: "2px solid #1976d2",
                    color: "#1976d2",
                  }
                : { color: "#757575" }
            }
            className="editHospitalSettings"
          >
          </div>
        </div>

        {activeTab == "generalSettings" ? (
          <div className="generalProfile">
            <div style={{ position: "relative" }} className="displayProfile">
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                }}
                className="editInfoBtn"
              >
              </div>
              <p className="profileHeading">Profile Details</p>
              <div className="avatarSection">
                {hospitalData.map((hospital) => (
                  <Avatar
                    key={hospital.hospital_registration_nos}
                    style={{
                      width: "70px",
                      height: "70px",
                      marginRight: "15px",
                    }}
                    src={`/uploads/${hospital.image}`}
                  />
                ))}
                <label htmlFor="icon-button-file">
                  <Input
                    onChange={uploadHospitalImage}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                  />
                  <p className="imageSelectorBtn">Upload Hospital Image</p>
                </label>
                <Button
                  style={{ textTransform: "none" }}
                  onClick={() => setHospitalImage("")}
                  variant="outlined"
                >
                  Delete
                </Button>
              </div>

              {/* <p style={{ margin: "20px 0 10px 0" }} className="profileHeading">
                Your Info
              </p> */}
              {hospitalData.map((hospital) => (
                <div
                  key={hospital.hospital_registration_nos}
                  className="userInfoDisplay"
                >
                  <div>
                    <p className="userInfoHospitalName">Hospital Name</p>
                    <p className="userInfoHospitalValue">
                      {hospital.hospital_name}
                    </p>
                  </div>
                  <div>
                    <p className="userInfoAdminName">Admin Name</p>
                    <p className="userInfoHospitalValue">
                      {hospital.user_name}
                    </p>
                  </div>
                </div>
              ))}
              <div>
                <p className="userInfoHospitalName">Hospital Information</p>
                {hospitalData.map((hospital) => (
                  <p
                    key={hospital.hospital_registration_nos}
                    className="userInfoHospitalValue"
                  >
                    {hospital.about}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="dialouges">
        <Dialog
          open={changePasswordDialoug}
          onClose={() => setChangePasswordDialoug(false)}
        >
          <DialogTitle sx={{ fontFamily: "poppins" }}>
            Change Password
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: "poppins" }}>
              Enter the email id of which you wish to change the password, An
              OTP will be shared to you email id to confirm the email.
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontFamily: "poppins", textTransform: "none" }}
              onClick={() => setChangePasswordDialoug(false)}
            >
              Cancel
            </Button>
            <Button sx={{ fontFamily: "poppins", textTransform: "none" }}>
              Send OTP
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={changePasswordDialoug}
          onClose={() => setChangePasswordDialoug(false)}
        >
          <DialogTitle sx={{ fontFamily: "poppins" }}>
            Change Password
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: "poppins" }}>
              Enter the email id of which you wish to change the password, An
              OTP will be shared to you email id to confirm the email.
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontFamily: "poppins", textTransform: "none" }}
              onClick={() => setChangePasswordDialoug(false)}
            >
              Cancel
            </Button>
            <Button sx={{ fontFamily: "poppins", textTransform: "none" }}>
              Send OTP
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
