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
import { useNavigate } from 'react-router-dom'

import './adminSignup.css'



export const AdminSignup = () => {

    const [hospitalName, setHospitalName] = useState("");
    const [hospitalId, setHospitalId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Sign Up");

    const [hospitalNameValid , setHospitalNameValid] = useState(true);

    const [adminName, setAdminName] = useState("");
    const [hospitalCity, sethospitalCity] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [phone, setPhone] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [image, setImage] = useState("");
    const [iframe, setIframe] = useState("");
    
    const [IsPinCodeValid, setIsPinCodeValid] = useState(true);
    const [pincode, setPinCode] = useState("");
    const [isHospitalIdInvalid, setIsHospitalIdInvalid] = useState(false);
    const [Specialities, setSpecialities] = useState("");
    const [isSpecialityValid, setIsSpecialityValid] = useState(true);
     const [hospitalInformation, setHospitalInformation] = useState("");
    const [isInformationValid, setIsInformationValid] = useState(true);
    const [city, setCity] = useState("");
    const [isCityValid, setIsCityValid] = useState(true);

    // // const [variable_name, function_name] = useState(initializing data type)
    // // function is used to manipulate data within variable. its paramters are values of variable of usestate


    // //useeffect runs when all html components are rendered.....ie...at last if we use array
    // // if we do not use empty array .....it runs indefinitely
    // // array contains values which gonna update after which useeffect runs each time that value updated

    const setInformationField = (e) =>{
            
        if(e.target.value > 0){

            setIsInformationValid(true);
            setHospitalInformation(e.target.value);
        }
        else{
            
            setIsInformationValid(false);
        }

        
        
    }
    const navigate = useNavigate();

    const setAdminNameField = (e) => {
        setAdminName(e.target.value);
    }

    const setCityField = (e) => {
        sethospitalCity(e.target.value);
    }

    const setSpecialitiesField = (e)=>{
        if(e.target.value.length==0)
           { 
               setIsSpecialityValid(false);
            
           }
        else
        {
            setIsSpecialityValid(true);
            setSpecialities(e.target.value);
        }
    }

    const setHospitalNameField = (e)=>{
        if(e.target.value.length==0)
           { setHospitalNameValid(false);
            
           }
        else
        {
            setHospitalNameValid(true);
            setHospitalName(e.target.value);
        }
    }


    const setPhoneField = (e) => {
        if (e.target.value.length == 10) {

            setIsPhoneValid(true);
            setPhone(e.target.value);
        }
        else{
            setIsPhoneValid(false);
        }
    }
    
    
    const setPinCodeField = (e) => {
        if (e.target.value.length == 6) {

            setIsPinCodeValid(true);
            setPinCode(e.target.value);
        }
        else{
            setIsPinCodeValid(false);
        }
}
    
    const setPasswordField = (e) => {
            setNewPassword(e.target.value);
    }



    const setConfirmPasswordField = (e) => {
            setConfirmPassword(e.target.value);

            if (e.target.value == newPassword) {
                setIsPasswordMatch(false);
            }
            else {

                setIsPasswordMatch(true);

            }
        }

        const setHospitalIdData = (e) => {

            if (e.target.value !== "") {
                setIsHospitalIdInvalid(false);
                setHospitalId(e.target.value);
            }
            else {
                setIsHospitalIdInvalid(true);
            }

        }

        const setCityData = (e) => {

            if (e.target.value !== "") {
                setIsCityValid(true);
                setCity(e.target.value);
            }
            else {
                setIsCityValid(false);
            }

        }
        const sendData = () => {


            if (buttonText == 'Sign Up' && isCityValid && !isPasswordMatch && !isHospitalIdInvalid && hospitalNameValid && isPhoneValid && IsPinCodeValid && isSpecialityValid && isInformationValid) {
                
                setIsLoading(true);
                Axios.post('http://localhost:5000/dashboard/hospital/register', {
                    hospitalId: hospitalId,
                    hospitalName: hospitalName,
                    adminName: adminName,
                    hospitalCity: city,
                    hospitalPin: pincode,
                    hospitalPassword : newPassword,
                    hospitalBio: hospitalInformation,
                    hospitalTags: Specialities,
                    hospitalContact : phone,
                    
            }, { withCredentials: true }).then(res => {
                        setIsLoading(false);
                        if (res.data.code === 1) {
                            console.log(res)



                            navigate('/'); //front end will make get request to backend
                        }
                        else {
                            

                        }
                    }).catch(err => {
                        console.log(err)
                    });
            }
            // we are handling response sent by server in .then and .catch function
        }

        return (
            <div className="AdminSignUpform">

                <div className="SignupText">
                    Admin SignUp Form
                </div>

                <div className="textAndButtons">
                 <div style={{display:"flex"}} className="form1">
                        <FormControl
                            style={{marginRight: '5px'}}
                            className="formChild"
                            label="Hospital ID"
                            fullWidth
                            margin="normal"
                            autoComplete="off"
                            error={isHospitalIdInvalid}
                            onChange={setHospitalIdData}>
                            <TextField />
                        </FormControl>


                        <FormControl
                            label="Hospital Name"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            error={!hospitalNameValid}
                            onChange={setHospitalNameField}
                        >
                            <TextField />
                        </FormControl>
                </div>
                        <FormControl
                            label="Admin  Name"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            error={false}
                            onChange={setAdminNameField}
                        >
                            <TextField />
                        </FormControl>

                        <FormControl
                            label="Information about hospital"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            error={!isInformationValid}
                            onChange={setInformationField}
                        >
                            <TextField />
                        </FormControl>
                        <FormControl
                            label="Specialities"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            error={!isSpecialityValid }
                            onChange={setSpecialitiesField}
                        >
                            <TextField />
                        </FormControl>

                        <FormControl
                            label="City"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            error={!isCityValid}
                            onChange={setCityData}
                        >
                            <TextField />
                        </FormControl>

                        <FormControl
                            label="Phone"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            error ={!isPhoneValid}
                            onChange={setPhoneField}
                        >
                            <TextField />
                        </FormControl>

                        <FormControl
                            label="Hospital PinCode"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            error={!IsPinCodeValid}
                            onChange={setPinCodeField}
                        >
                            <TextField />
                        </FormControl>

                        <FormControl
                            label="New Password"
                            fullWidth
                            margin="normal"
                            type="password"
                            autoComplete="off"
                            error={false}
                            onChange={setPasswordField}
                        >
                            <TextField />
                        </FormControl>

                        <FormControl
                            label="Confirm New Password"
                            fullWidth
                            margin="normal"
                            type="password"
                            autoComplete="off"
                            error={isPasswordMatch}
                            onChange={setConfirmPasswordField}
                        >
                            <TextField />
                        </FormControl>
                    

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

                        {isLoading ? <CircularProgress color="inherit" /> : buttonText}
                    </Button>
                </div>
            </div>

        )
    }

