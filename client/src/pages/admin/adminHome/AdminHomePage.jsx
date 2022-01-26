import React, {useEffect, useState} from 'react';
import { SideBar } from '../../../components/admin/sidebar/admin.sidebar';
import { Dashboard } from '../../../components/dashboard/dashboard';
import Axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import './AdminHomePage.css'
import { AddDoctor } from '../addDoctor/addDoctor';



export const AdminHomePage = () => {
  const navigate = useNavigate()

  const [hospitalName,setHospitalName] = useState('');
  const [city,setCity] = useState('');
  const [hospitalImg, setHospitalImg] = useState('');
  useEffect(()=>{
    document.title = "hospital dashboard";
    Axios.get('http://localhost:5000/dashboard/hospital/isadmin',{
      withCredentials:true
    }).then(res =>{
        if(res.data.isAdmin){
          console.log(res.data);
          setHospitalName(res.data.data[1]);
          setCity(res.data.data[2]);
          setHospitalImg(res.data.data[8])
        }
        else
        {
          navigate('/');
        }
    })
  })     
     
  console.log(hospitalName, city, hospitalImg)

  return (
    <div className="homePage">
              <div className='sidebar'>
                  <SideBar/>

              </div>
              <div className = "dashBoardDiv">
              <Dashboard/>
              {/* <img src={`/uploads/${hospitalImg}`} alt="" /> */}
              </div>
    </div>
  );
}

