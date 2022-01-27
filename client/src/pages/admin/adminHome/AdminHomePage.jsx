import React, {useEffect, useState} from 'react';
import { SideBar } from '../../../components/admin/sidebar/admin.sidebar';
import { Dashboard} from '../../../components/dashboard/dashboard';
import Axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import './AdminHomePage.css'
import { AddDoctor } from '../addDoctor/addDoctor';
import { ShowDoctor } from '../ShowDoctor/ShowDoctor';
import { ShowAppointment } from '../ShowAppointment/ShowAppointment';

export const AdminHomePage = () => {
  const navigate = useNavigate()

  const [hospitalName,setHospitalName] = useState('');
  const [city,setCity] = useState('');
  const [hospitalImg, setHospitalImg] = useState('');
  const [showDashboard,setShowDashboard] = useState(true);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);


  useEffect(()=>{
    document.title = "hospital dashboard";
    Axios.get('http://localhost:5000/dashboard/hospital/isadmin',{
      withCredentials:true
    }).then(res =>{
        if(res.data.isAdmin){
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
     
  console.log(showDashboard,showDoctors,showAppointments,showAddDoctor);
  return (
    <div className="homePage">
              <div className='sidebar' >
                  <SideBar setShowAddDoctor={setShowAddDoctor}  setShowDoctors={setShowDoctors}  setShowAppointments={setShowAppointments} setShowDashboar={setShowDashboard}/>
              </div>
              <div className = "dashBoardDiv">
              <Dashboard shouldShow = {showDashboard}/>
              <AddDoctor shouldShow = {showAddDoctor}/>

              <ShowDoctor shouldShow={showDoctors} />
              <ShowAppointment shouldShow = {showAppointments}/>
              
              </div>
    </div>
  );
}

