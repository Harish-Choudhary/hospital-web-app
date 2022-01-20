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

import './adminSignup.css'



export const AdminSignup = () => {

    // const [hospitalName, setHospitalName] = useState("");
    // const [hospitalId, setHospitalId] = useState("");
    // const [isLoading, setIsLoading] = useState(false);
    // const [buttonText, setButtonText] = useState("Sign Up");
    
    
    
    // const [adminName ,setAdminName]=useState("");
    // const [hospitalCity ,sethospitalCity]=useState("");
    // const [newPassword ,setNewPassword]=useState("");
    // const [confirmPassword ,setConfirmPassword]=useState("");
    // const [isPasswordMatch , setIsPasswordMatch] = useState(false);
    // const [phone , setPhone] = useState("");
    // const [image ,setImage] = useState("");
    // const [iframe ,setIframe] = useState("");
    // const [pincode ,setPincode] = useState("");
    // const [tags ,setTags] = useState("");
    // const [isHospitalIdInvalid,setIsHospitalIdInvalid] = useState(false);
    // const [HospitalBio , setHospitalBio] = useState(false);
    
    // // const [variable_name, function_name] = useState(initializing data type)
    // // function is used to manipulate data within variable. its paramters are values of variable of usestate


    // //useeffect runs when all html components are rendered.....ie...at last if we use array
    // // if we do not use empty array .....it runs indefinitely
    // // array contains values which gonna update after which useeffect runs each time that value updated
    
    // const navigate = useNavigate();

    // const setNameField=(e) =>{
    //     setAdminName(e.target.value);
    // }

    // const setCityField=(e) =>{
    //     setUserCity(e.target.value);
    // }

    // const setPhoneField=(e) =>{
    //     setPhone(e.target.value);
    // }

    // const setPasswordField=(e) =>{
    //     setNewPassword(e.target.value);
    // }

    // const setConfirmPasswordField=(e) =>{
    //     setConfirmPassword(e.target.value);

    //     if(e.target.value == newPassword)
    //     {
    //         setIsPasswordMatch(false);
    //     }
    //     else{
        
    //     setIsPasswordMatch(true);
            
    //     }
    // }

    

    
    // useEffect(() => {

    //     document.title = "HealthAura Sign Up"

    // }, []);

    // //api calls are mostly invoked in useeffect
    

    // //defining usestate function
    // const setHospitalIdData = (e) => {

    //     if (e.target.value != "") {
    //         setIsHospitalIdInvalid(false);
    //         setHospitalId(e.target.value);
    //     }
    //     else {
    //         setIsHospitalIdInvalid(true);
    //     }

    // }
    
    // const sendData = () => {

        
    //     if (buttonText == 'Sign Up' && !isPasswordMatch)
    //     {
    //         console.log("this is user emailllllllllll    ====>>>>" + userEmail)
    //         setIsLoading(true);
    //         Axios.post('http://localhost:5000/dashboard/hospital/register', {
    //             hospitalId : hospitalId,
    //             hospitalName : hospitalName,
    //             adminName : adminName,
    //             hospitalCity  : hospitalCity,
    //             hospitalPin : pincode,
    //             // hospitalPassword : ,
    //             hospitalBio : HospitalBio,
    //             hospitalTags : tags,
    //             // hospitalContact : ,
    //             hospitalIframe : 
    //         },{withCredentials: true}).then(res => {
    //             setIsLoading(false);
    //             if (res.data.code == 1) {
    //                 console.log(res)
                    
                    
                    
    //                 navigate('/'); //front end will make get request to backend
    //             }
    //             else {
                    
                    
    //             }
    //         }).catch(err => {
    //             console.log(err)
    //         });
    //     }
    //     // we are handling response sent by server in .then and .catch function
    // }

    // return (
    //     <div className="signUpform">
    //         {/*  */}

    //         <div className="SignupText">
    //            Admin SignUp Form
    //         </div>

    //         <div className="textAndButtons">
    //             <div className="emailAndOtp">
    //                 <FormControl
    //                     label="Hospital ID"
                        
    //                     fullWidth
    //                     margin="normal"
    //                     autoComplete="off"
    //                     error={isHospitalIdInvalid}
    //                     onChange={setHospitalIdData}>
    //                         <TextField />
    //                     </FormControl>
    //                 <FormControl
    //                     label="OTP"
    //                     fullWidth
    //                     margin="normal"
    //                     type="text"
    //                     autoComplete="off"
    //                     error={isOTPInvalid}
    //                     disabled={OTPDisabled ? true : false}
    //                     onChange={setOTPdata}
    //                 >
    //                     <TextField />
    //                 </FormControl>
    //             </div>
    //             <div>
    //                 <FormControl
    //                     label="Full Name"
    //                     fullWidth
    //                     margin="normal"
    //                     type="text"
    //                     autoComplete="off"
    //                     error={false}
    //                     onChange={setNameField}
    //                 >
    //                     <TextField />
    //                 </FormControl>

    //                 <FormControl
    //                     label="City"
    //                     fullWidth
    //                     margin="normal"
    //                     type="text"
    //                     autoComplete="off"
    //                     error={false}
    //                     onChange={setCityField}
    //                 >
    //                     <TextField />
    //                 </FormControl>

    //                 <FormControl
    //                     label="Phone"
    //                     fullWidth
    //                     margin="normal"
    //                     type="text"
    //                     autoComplete="off"
    //                     onChange={setPhoneField}
    //                 >
    //                     <TextField />
    //                 </FormControl>

    //                 <FormControl
    //                     label="New Password"
    //                     fullWidth
    //                     margin="normal"
    //                     type="password"
    //                     autoComplete="off"
    //                     error={false}
    //                     onChange={setPasswordField}
    //                 >
    //                     <TextField />
    //                 </FormControl>

    //                 <FormControl
    //                     label="Confirm New Password"
    //                     fullWidth
    //                     margin="normal"
    //                     type="password"
    //                     autoComplete="off"
    //                     error={isPasswordMatch}
    //                     onChange={setConfirmPasswordField}
    //                 >
    //                     <TextField />
    //                 </FormControl>
    //             </div>

    //             <Button
    //                 fullWidth
    //                 variant="contained"
    //                 onClick={sendData}
    //                 sx={{
    //                     backgroundColor: "#2774f8",
    //                     padding: "10px 0",
    //                     margin: "15px 0",
    //                     textTransform: "none",
    //                     fontSize: "18px",
    //                     fontWeight: "300",

    //                 }}> 

    //                 {isLoading ? <CircularProgress color="inherit" /> : buttonText}
    //             </Button>
    //         </div>
        // </div>

    // )
}

// 
// |  web app  | => email => onChange => OnChange={setEmail} =>