import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";




export const AdminHeader = () => {

  const navigate = useNavigate()


    const redirectToSettings = () => {
        navigate({
          pathname: "/hospital/dashboard/settings/"
        })
      }

    return (
        <div onClick={redirectToSettings} style={{
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
            zIndex: 10
        }}>
            <p style={{margin: "0 10px"}}>Aditya Birla...</p>
            <Avatar alt="Remy Sharp" src="" />
        </div>
    )
}