import React from "react"

export const ShowAppointment = (props)=>{
    return (
        <div style={props.shouldShow ? {display:"block"} : {display:"none"}}>
            <h1>Show Appointment</h1>
        </div>
    )
}