import React, { useState } from "react";
import "./sidebar.styles.css";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useNavigate } from "react-router-dom";
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import { fontWeight } from "@mui/system";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import BloodtypeRoundedIcon from '@mui/icons-material/BloodtypeRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export const SideBar = ({active}) => {

  const navigate = useNavigate()

  const redirectToDashboard = () => {
    navigate({
      pathname: "/hospital/dashboard/"
    })
  }

  const redirectToAddDoctor = () => {
    navigate({
      pathname: "/hospital/dashboard/add/doctor/"
    })
  }

  const redirectToShowDoctor = () => {
    navigate({
      pathname: "/hospital/dashboard/show/doctors"
    })
  }

  const redirectToAppointments = () => {
    navigate({
      pathname: "/hospital/dashboard/appointments/"
    })
  }

  const redirectToSettings = () => {
    navigate({
      pathname: "/hospital/dashboard/settings/"
    })
  }

  const logoutAdmin = () => {
    console.log("admin logout")
  }

  return (
    <div className="sidebar">
      <div className="logo">
        <p className="adminLogo">HealthAura</p>
      </div>

      <div onClick={redirectToSettings} className="adminProfile">
        <Avatar src="" alt="Remy Sharp" />
        <p>Aditya Birla...</p>
      </div>

      <hr color="#757575" />

      <List sx={{margin: "20px 0"}}>

        <ListItem sx={ active == 'Dashboard' ? {
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          borderRadius: "6px",
          margin: "15px 0",
          color: "#1976d2",
          fontWeight: "600"
        } : {
          margin: "15px 0"
        }} onClick={redirectToDashboard}>
          <ListItemButton>
            <ListItemIcon>
              <SignalCellularAltRoundedIcon sx={active == 'Dashboard' ? {
                color: "#1976d2"
              }: {color : "white"}} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem> 

        <ListItem sx={ active == 'Add Doctor' ? {
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          borderRadius: "6px",
          margin: "15px 0",
          color: "#1976d2",
          fontWeight: "600"
        } : {
          margin: "15px 0"
        }} onClick={redirectToAddDoctor}>
          <ListItemButton>
            <ListItemIcon>
              <AddRoundedIcon sx={active == 'Add Doctor' ? {
                color: "#1976d2"
              }: {color : "white"}}  />
            </ListItemIcon>
            <ListItemText primary="Add Doctor" />
          </ListItemButton>
        </ListItem> 

        <ListItem sx={ active == 'Show Doctors' ? {
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          borderRadius: "6px",
          margin: "15px 0",
          color: "#1976d2",
          fontWeight: "600"
        } : {
          margin: "15px 0"
        }} onClick={redirectToShowDoctor}>
          <ListItemButton>
            <ListItemIcon>
              <BloodtypeRoundedIcon sx={active == 'Show Doctors' ? {
                color: "#1976d2"
              }: {color : "white"}}  />
            </ListItemIcon>
            <ListItemText primary="Show Doctors" />
          </ListItemButton>
        </ListItem> 

        <ListItem sx={ active == 'Appointments' ? {
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          borderRadius: "6px",
          margin: "15px 0",
          color: "#1976d2",
          fontWeight: "600"
        } : {
          margin: "15px 0"
        }} onClick={redirectToAppointments}>
          <ListItemButton>
            <ListItemIcon>
              <EventNoteRoundedIcon sx={active == 'Appointments' ? {
                color: "#1976d2"
              }: {color : "white"}}  />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItemButton>
        </ListItem> 

        <ListItem sx={ active == 'Settings' ? {
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          borderRadius: "6px",
          margin: "15px 0",
          color: "#1976d2",
          fontWeight: "600",
          fontFamily: "poppins"
        } : {
          margin: "15px 0"
        }} onClick={redirectToSettings}>
          <ListItemButton>
            <ListItemIcon>
              <SettingsRoundedIcon sx={active == 'Settings' ? {
                color: "#1976d2"
              }: {color : "white"}}  />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem> 

        <ListItem sx={ active == 'Logout' ? {
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          borderRadius: "6px",
          margin: "15px 0",
          color: "#1976d2",
          fontWeight: "600",
          fontFamily: "poppins"
        } : {
          margin: "15px 0"
        }} onClick={logoutAdmin}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutRoundedIcon sx={active == 'Logout' ? {
                color: "#1976d2"
              }: {color : "white"}}  />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem> 

      </List>
    </div>
  );
};

/*
  Dashboard
  add doctor
  all doctors
  appointments
  settings
*/
