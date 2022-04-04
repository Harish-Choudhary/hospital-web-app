import { styled } from "@mui/material/styles";
import { Avatar, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { AdminHeader } from "../../../components/admin/header/header";
import { SideBar } from "../../../components/admin/sidebar/sidebar.component";
import "./adddoctor.css";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const Input = styled("input")({
  display: "none",
});

export const AddDoctor = () => {
  const [doctorImage, setDoctorImage] = useState("");

  const [doctorName, setDoctorName] = useState("")
  const [doctorPhone, setDoctorPhone] = useState("")
  const [doctorBio, setDoctorBio] = useState("")
  const [doctorTags, setDoctorTags] = useState("")


  const uploadDoctorImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDoctorImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  console.log(doctorImage)

  return (
    <div className="addDoctorComponent">
      <div className="adminLeft">
        <SideBar active={"Add Doctor"} />
      </div>

      <div style={{ width: "82%" }}>
        <AdminHeader />

        <div className="addDoctorForm">
          <div class="addDoctorFormContainer">
            <label htmlFor="icon-button-file">
              <Input
                onChange={uploadDoctorImage}
                accept="image/*"
                id="icon-button-file"
                type="file"
              />
              <Avatar sx={{width: '50px', height: "50px"}} src={doctorImage}>
                {doctorImage.length > 0 ? null : <PhotoCamera />}
              </Avatar>
            </label>
            <TextField margin="normal" onChange={(e) => setDoctorName(e.target.value)} fullWidth label="Doctor Full Name" />
            <TextField margin="normal" onChange={(e) => setDoctorPhone(e.target.value)} fullWidth label="Doctor Phone" />
            <TextField margin="normal" onChange={(e) => setDoctorBio(e.target.value)} fullWidth label="Doctor Bio" />
            <TextField margin="normal" onChange={(e) => setDoctorTags(e.target.value)} fullWidth label="Doctor Tags" />

            <Button
              variant="contained"
              sx={{
                margin: "10px 0",
              }}
            >
              Add Doctor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};