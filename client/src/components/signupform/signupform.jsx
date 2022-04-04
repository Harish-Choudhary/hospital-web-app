import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { validate } from "react-email-validator";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import "./signupform.css";

export const SignUp = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isEmailInValid, setIsEmailInValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Send OTP");
  const [OTPDisabled, setOTPDisabled] = useState(true);
  const [OTP, setOTP] = useState("");
  const [isOTPInvalid, setIsOTPInvalid] = useState(false);
  const [showEmailAndOtp, setShowEmailAndOtp] = useState(true);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userName, setUserName] = useState("");
  const [userCity, setUserCity] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const setNameField = (e) => {
    setUserName(e.target.value);
  };

  const setCityField = (e) => {
    setUserCity(e.target.value);
  };

  const setPhoneField = (e) => {
    setPhone(e.target.value);
  };

  const setPasswordField = (e) => {
    setNewPassword(e.target.value);
  };

  const setConfirmPasswordField = (e) => {
    setConfirmPassword(e.target.value);

    if (e.target.value == newPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  };

  useEffect(() => {
    document.title = "HealthAura Sign Up";
  }, []);

  //api calls are mostly invoked in useeffect
  const setOTPdata = (e) => {
    if (e.target.value.length == 6) {
      setOTP(e.target.value);
      setIsOTPInvalid(false);
    } else setIsOTPInvalid(true);
  };

  //defining usestate function
  const setNewEmail = (e) => {
    if (validate(e.target.value)) {
      setIsEmailInValid(false);
      setUserEmail(e.target.value);
    } else {
      setIsEmailInValid(true);
    }
  };

  const sendData = () => {
    if (buttonText == "Send OTP") {
      setIsLoading(true);
      console.log(userEmail);

      //this is same thing we were403704 doing on thunderclient ie. making post request
      Axios.post("http://localhost:5000/auth/verify/email", {
        userEmail: userEmail,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.data.code == 1) {
            console.log(res);
            setButtonText("Verify OTP");
            setOTPDisabled(false);
          } else {
            setButtonText("Send OTP");
            setOTPDisabled(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // TO-DO
    if (buttonText == "Verify OTP") {
      setIsLoading(true);
      Axios.post("http://localhost:5000/auth/verify/otp", {
        userEmail: userEmail,
        OTP: OTP,
      })
        .then((res) => {
          setIsLoading(false);
          if (res.data.code == 1) {
            console.log(res);
            setButtonText("Sign Up");
            setShowEmailAndOtp(false);
            setShowUserDetails(true);
          } else {
            setButtonText("Verify OTP");
            // setShowEmailAndOtp(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (buttonText == "Sign Up" && !isPasswordMatch) {
      console.log("this is user emailllllllllll    ====>>>>" + userEmail);
      setIsLoading(true);
      Axios.post(
        "http://localhost:5000/auth/signup",
        {
          userEmail: userEmail,
          userName: userName,
          userCity: userCity,
          userPassword: newPassword,
          userPhone: phone,
        },
        { withCredentials: true }
      )
        .then((res) => {
          setIsLoading(false);
          if (res.data.code == 1) {
            console.log(res);
            setButtonText("Sign Up");
            setShowEmailAndOtp(false);
            setShowUserDetails(true);
            navigate("/"); //front end will make get request to backend
          } else {
            setButtonText("Verify OTP");
            // setShowEmailAndOtp(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // we are handling response sent by server in .then and .catch function
  };

  return (
    <div className="signUpform">
      {/*  */}

      <div className="SignupText">SignUp Form</div>

      <div className="textAndButtons">
        <div
          style={showEmailAndOtp ? { display: "block" } : { display: "none" }}
          className="emailAndOtp"
        >
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
            label="OTP"
            fullWidth
            margin="normal"
            type="text"
            autoComplete="off"
            error={isOTPInvalid}
            disabled={OTPDisabled ? true : false}
            onChange={setOTPdata}
          >
            <TextField />
          </FormControl>
        </div>
        <div
          style={showUserDetails ? { display: "block" } : { display: "none" }}
        >
          <FormControl
            label="Full Name"
            fullWidth
            margin="normal"
            type="text"
            autoComplete="off"
            error={false}
            onChange={setNameField}
          >
            <TextField />
          </FormControl>

          <FormControl
            label="City"
            fullWidth
            margin="normal"
            type="text"
            autoComplete="off"
            error={false}
            onChange={setCityField}
          >
            <TextField />
          </FormControl>

          <FormControl
            label="Phone"
            fullWidth
            margin="normal"
            type="text"
            autoComplete="off"
            onChange={setPhoneField}
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
        </div>

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
          }}
        >
          {isLoading ? <CircularProgress color="inherit" /> : buttonText}
        </Button>
      </div>
    </div>
  );
};