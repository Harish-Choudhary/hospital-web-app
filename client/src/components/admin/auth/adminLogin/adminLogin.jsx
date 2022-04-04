import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import Button from "@mui/material/Button"
import CircularProgress from '@mui/material/CircularProgress';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'


export const AdminLogin = () => {

    const [hospitalID, setHospitalID] = useState("");
    const [isHospitalIdInvalid, setIsHospitalIdInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordField ,setPasswordField]=useState("");
    const [isPasswordInvalid,setPasswordInvalid] = useState(false);
    const [msg ,setmsg]=useState("");

    const hospitalIdHelper = (e) =>{

            if(e.target.value.length > 0){

                setIsHospitalIdInvalid(false);
                setHospitalID(e.target.value);
            }
            else{

                setIsHospitalIdInvalid(true);
            }

    }
    
    const navigate = useNavigate();


    const hospitalPasswordHelper=(e) =>{
        if(e.target.value.length > 0){

            setPasswordField(e.target.value);
            setPasswordInvalid(false);
        }
        else
        {
            setPasswordInvalid(true);

        }

    }

    
    
    useEffect(() => {

        document.title = "HealthAura Hospital Login"

    }, []);

    //api calls are mostly invoked in useeffect
    
    const sendData = () => {
        setIsLoading(true);
        Axios.post('http://localhost:5000/dashboard/hospital/login',{
            hospitalId : hospitalID,
            hospitalPassword : passwordField
        },{withCredentials:true}).then(res=>
            {
                console.log(res)
                if(res.data.code!=1)
                {
                    setmsg(res.data.msg)
                    setIsLoading(false);}
                else
                {
                    navigate('/hospital/dashboard');
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className="AdminLoginform">
            {/*  */}

            <div className="LoginText">
               Login Form
            </div>

            <div className="textAndButtons">
                <div className="hospitalId">
                    <FormControl
                        label="Hospital Id"
                        type="text"
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                        error={isHospitalIdInvalid}
                        onChange={ hospitalIdHelper }
                    >
                        <TextField />
                    </FormControl>
                    
                    <FormControl
                        label="Password"
                        fullWidth
                        margin="normal"
                        type="password"
                        autoComplete="off"
                        error={false}
                        onChange={hospitalPasswordHelper}
                    >
                        <TextField />
                    </FormControl>

                    
                </div>
                
                <p style={{color:'red' }}>{msg}</p>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={sendData}
                    sx={{
                        backgroundColor: "#2774f8",
                        padding: "10px 0",
                        margin: "15px 0",
                        textTransform: "none",
                        fontSize: "18px",
                        fontWeight: "300",

                    }}> 

                    {isLoading ? <CircularProgress color="inherit" /> : 'Log In'}
                </Button>
            </div>
        </div>

    )
}
