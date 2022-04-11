import { Button } from "@mui/material";
import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Header} from '../../components/header/header';
import hospitalImage from '../../images/city-hospital-building_74855-6301.webp'
import './home.css'
export const HomePage = () =>{
 
    const navigate = useNavigate();

    const redirectToHospitalPage = () => {
        navigate("/hospitals")
    }
    
    
    return(

        
        <div>
            <Header/>

            <div className="heroArea">
                <div className="leftHeroArea">
                    <h2>HealthAura</h2>
                    <p>Complete Healthcare System, Find the nearest hospitals and book appointment online</p>
                    <Button onClick={redirectToHospitalPage} variant="contained">Hospitals</Button>
                </div>  

                <div className="heroImage">
                    <img src={hospitalImage} alt="" />
                </div>              
            </div>

        </div>
    )
}
