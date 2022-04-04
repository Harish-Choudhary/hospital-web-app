import { Avatar, Button, styled } from "@mui/material";
import React, { useState } from "react";
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

const Input = styled("input")({
  display: "none",
});

export const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("generalSettings");
  const [hospitalImage, setHospitalImage] = useState("");
  const [changePasswordDialoug, setChangePasswordDialoug] = useState(false);
  const [cloaseAccountDialoug, setCloaseAccountDialoug] = useState(false);

  const uploadHospitalImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setHospitalImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

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
            <p>Edit Hospital</p>
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
                <Button
                  sx={{ textTransform: "none" }}
                  endIcon={<ArrowRightAltRoundedIcon />}
                  onClick={() => setActiveTab("editHospital")}
                >
                  Edit Info
                </Button>
              </div>
              <p className="profileHeading">Profile Details</p>
              <div className="avatarSection">
                <Avatar
                  style={{ width: "70px", height: "70px", marginRight: "15px" }}
                  src={hospitalImage}
                />
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
              <div className="userInfoDisplay">
                <div>
                  <p className="userInfoHospitalName">Hospital Name</p>
                  <p className="userInfoHospitalValue">
                    Aditya Birla Memorial Hospital
                  </p>
                </div>
                <div>
                  <p className="userInfoAdminName">Admin Name</p>
                  <p className="userInfoHospitalValue">Harish Choudhary</p>
                </div>
              </div>
              <div>
                <p className="userInfoHospitalName">Hospital Information</p>
                <p className="userInfoHospitalValue">
                  Aditya Birla Memorial Hospital is a multi-speciality medical
                  centre in Pune, India. The hospital is named for Aditya Birla.
                  Rajashree Birla, chairperson of the Aditya Birla Foundation
                  which is funding the medical centre, is steering this project.
                </p>
              </div>
            </div>

            <div className="changePassword">
              <p className="headingTitle">Change Password</p>
              <p className="metaDataForCPCA">
                Make sure your account password is strong, and don't share it
                with anyone.
              </p>
              <p
                onClick={() => setChangePasswordDialoug(true)}
                className="changePasswordBtn"
              >
                Change Password
              </p>
            </div>

            <div className="closeAccount">
              <p className="headingTitle">Close Account</p>
              <p className="metaDataForCPCA">
                You can permanently delete you Hospital Account, If you want to
                Re-Add the hospital you'll need to create new account.
              </p>
              <p className="changePasswordBtn">Close Account</p>
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
              Enter the email id of which you wish to change the password, An OTP will be shared to you email id to confirm the email.
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
          <DialogActions >
            <Button sx={{ fontFamily: "poppins", textTransform:"none" }} onClick={() => setChangePasswordDialoug(false)}>
              Cancel
            </Button>
            <Button sx={{ fontFamily: "poppins", textTransform:"none" }}>Send OTP</Button>
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
              Enter the email id of which you wish to change the password, An OTP will be shared to you email id to confirm the email.
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
          <DialogActions >
            <Button sx={{ fontFamily: "poppins", textTransform:"none" }} onClick={() => setChangePasswordDialoug(false)}>
              Cancel
            </Button>
            <Button sx={{ fontFamily: "poppins", textTransform:"none" }}>Send OTP</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};