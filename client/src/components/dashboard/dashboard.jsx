import React , {useState} from 'react';
import { Data } from '../data/data';
import './dashboard.css' 
export const Dashboard = (props) => {
  
        const [currentAppointments, setCurrentAppointments] = useState("10");
        const [pendingAppointments, setPendingAppointments] = useState("10");
        const [numberOfDoctors, setNumberOfDoctors] = useState("10");
        const [dummy,setDummy] = useState("10");

        const arrayOfObjects = [
            {data : currentAppointments, display: "Current number of appointments"},
            {data : pendingAppointments, display: "Number of pending appointments"},
            {data:numberOfDoctors, display:"Total number of doctors"},
            {data:dummy, display:"Dummy"}    
        ];


    
      return (


        <div className="dashBoard" style={props.shouldShow ? {display: "grid"} : {display: "none"}}>

        {arrayOfObjects.map(({ data, display, index} ) => (
                 <Data data = {data} display = {display} key={index}/>
        ))}

        </div>



        )
};
