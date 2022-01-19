import React,{useEffect, useState} from "react";

import {Header} from '../../components/header/header';
import Axios from "axios";
export const HomePage = () =>{

    const [isLogin , setIsLogin] = useState(false);
    useEffect(() => {
        Axios.get('http://localhost:5000/auth/checkIsLogin',{withCredentials : true}).then(res=>{
            if(res.data.isLogin)
            {
                    setIsLogin(true);
             }
            else{

                setIsLogin(false);
            }
        })
        
    }, [])
    
    return(

        
        <div>
            <Header isLogin={isLogin}/>

        </div>




    )
}
