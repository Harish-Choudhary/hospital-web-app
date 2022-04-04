import React,{useEffect} from "react";
import { Button } from "../../../components/styledComponent/button";
import { SignUp } from "../../../components/signupform/signupform";
import IconButton from "@mui/material/IconButton"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Login } from "../../../components/loginform/loginform";
import "./auth.style.css"
import Axios from 'axios';
import {useNavigate} from 'react-router-dom'


 
export const AuthPage = () => {

    const [showSignUpform, setshowSignUpform] = React.useState(true)
    const navigate = useNavigate();
    

    useEffect(() => {
        Axios.get('http://localhost:5000/auth/checkIsLogin',{withCredentials : true}).then(res=>{
            if(res.data.isLogin)
            {
                navigate('/');
            }
        })
        
    }, [])


    const showSignInform =()=>{
        setshowSignUpform(!showSignUpform)
        
    }

    const goBack = () =>{

        navigate(-1);
    }
    

    //always wrap html in one tag for example <div> or <>
    return (
        <div className="AuthPage">
            <div className="left">
                <div className="backbtn" onClick={goBack}>
                    <IconButton>
                        <ArrowBackIcon />
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
                {
                    showSignUpform ? <SignUp/> : <Login/>
                }
                <p>{showSignUpform ?'Already have an account?' :"Don't have an account ? "} <span onClick={showSignInform} style={{color:'#2774f8',cursor:'pointer'}}>{showSignUpform ? 'Sign In' : 'Register'}</span></p>
            </div>
        </div>
    )
}





