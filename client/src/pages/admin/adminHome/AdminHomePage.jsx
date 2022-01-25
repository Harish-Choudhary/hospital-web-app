import React, {useEffect, useState} from 'react';
import { SideBar } from '../../../components/admin/sidebar/admin.sidebar';
import { Dashboard } from '../../../components/dashboard/dashboard';
import Axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import './AdminHomePage.css'



export const AdminHomePage = () => {
  const navigate = useNavigate()

  const [hospitalName,setHospitalName] = useState('');
  const [city,setCity] = useState('');
  useEffect(()=>{
    document.title = "hospital dashboard";
    Axios.get('http://localhost:5000/dashboard/hospital/isadmin',{
      withCredentials:true
    }).then(res =>{
        if(res.data.isAdmin){
          console.log(typeof(res.data));
          setHospitalName(res.data.data[1]);
          setCity(res.data.data[2]);
        }
        else
        {
          navigate('/');
        }
    })
  })     
     
  console.log(hospitalName, city)

  return (
    <div className="homePage">
              <div className='sidebar'>
                  <SideBar/>

              </div>

              <div className = "dashBoardDiv"> 
              <Dashboard/>
              </div>
    </div>
  );
}