import React , {useState} from 'react';
import { Data } from '../data/data';
import './dashboard.css' 
export const Dashboard = () => {
  
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


        <div className="dashBoard">

        {arrayOfObjects.map(({ data, display} ) => (
                 <Data data = {data} display = {display} />
        ))}

        </div>



        )
};
