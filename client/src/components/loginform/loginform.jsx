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
import { validate } from 'react-email-validator'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'

// import './loginform.css'



export const Login = () => {

    const [userEmail, setUserEmail] = useState("");
    const [isEmailInValid, setIsEmailInValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [buttonText, setButtonText] = useState("Sign In");
    const [newPassword ,setNewPassword]=useState("");
    const [msg ,setmsg]=useState("");

    // const [variable_name, function_name] = useState(initializing data type)
    // function is used to manipulate data within variable. its paramters are values of variable of usestate


    //useeffect runs when all html components are rendered.....ie...at last if we use array
    // if we do not use empty array .....it runs indefinitely
    // array contains values which gonna update after which useeffect runs each time that value updated
    
    const navigate = useNavigate();


    const setPasswordField=(e) =>{
        setNewPassword(e.target.value);
    }

    
    
    useEffect(() => {

        document.title = "HealthAura Login"

    }, []);

    //api calls are mostly invoked in useeffect
   
    //defining usestate function
    const setNewEmail = (e) => {

        if (validate(e.target.value)) {
            setIsEmailInValid(false);
            setUserEmail(e.target.value);
        }
        else {
            setIsEmailInValid(true);
        }

    }
    
    const sendData = () => {
        setIsLoading(true);
        Axios.post('http://localhost:5000/auth/signin',{
            userEmail : userEmail,
            userPassword : newPassword
        },{withCredentials:true}).then(res=>
            {
                console.log(res)
                if(res.data.code!=1)
                {setmsg(res.data.msg)
                setIsLoading(false);}
                else
                {
                    navigate('/');
                }
            }).catch(err => console.log(err))
    }

        
        


    return (
        <div className="Loginform">
            {/*  */}

            <div className="LoginText">
               Login Form
            </div>

            <div className="textAndButtons">
                <div className="emailAndOtp">
                    <FormControl
                        label="Email"
                        type="Email"
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                        error={isEmailInValid}
                        onChange={setNewEmail}
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
                        onChange={setPasswordField}
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


