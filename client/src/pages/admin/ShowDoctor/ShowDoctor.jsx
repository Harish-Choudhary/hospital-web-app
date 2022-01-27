import React from "react"

export const ShowDoctor = (props)=>{
    return (
        <div style={props.shouldShow ? {display: "block"} : {display: "none"}}>
                <p>helllllllo</p>
        </div>
    )
}