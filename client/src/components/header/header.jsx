import React from 'react';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './header.css'
export const  Header = ({isLogin}) => {
   const navigate = useNavigate();
  
   const changeToSignUp =() =>{

    navigate('/signup');

   }
   return(
   
    <div className="header">
    
        <div className="logo">
            <h1>HealthAura</h1>
        </div>
        <div className='right-header'>
            <p>Hospitals</p>
            <p>About Us</p>
            <p>Contact</p>
            <div className="profile">
                {
                    isLogin    ?
                    
                    <div>

                        <AccountCircleOutlined/>

                    </div>  
                    :

                    <div>
                                         
                      <Button variant='contained' sx={{backgroundColor : '#475bd8'}} onClick={changeToSignUp}>Sign Up</Button>                   
                    </div>   
                }

                
            </div>
        </div>
        

    
    </div>
    
  ) 
}
