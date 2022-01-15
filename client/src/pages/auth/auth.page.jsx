import React from "react";
import { Button } from "../../components/styledComponent/button";
import { SignUp } from "../../components/signupform/signupform";
import IconButton from "@mui/material/IconButton"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import "./auth.style.css"
export const AuthPage = () =>{
//always wrap html in one tag for example <div> or <>
    return (
        <div className="AuthPage">
            <div className="left">
                <div className="backbtn">
                    <IconButton>
                        <ArrowBackIcon/>
                    </IconButton>
                </div>

                <div className="msg_area">
                    <div className="msg_blur">
                        <h2>Join HealthAura</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis architecto, aperiam earum incidunt cupiditate a.</p>
                    </div>
                </div>

            </div>


            <div className="right">
                <SignUp/>
                <p>ALready have an account ? <span>Sign in</span></p>

            </div>
        </div>
    )
}