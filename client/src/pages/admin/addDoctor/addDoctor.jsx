import React from "react";
import { FormControl, TextField } from "@mui/material";
import CreatableSelect from 'react-select/creatable'
import { SideBar } from "../../../components/admin/sidebar/admin.sidebar";
import '../adminHome/AdminHomePage.css'
export const AddDoctor = (props) => {
    return (
        <div style={props.shouldShow ? {display:"block"} : {display:"none"}}>
            <div className="homePage">
              
              <div className = "dashBoardDiv">
              <FormControl
                label="Doctor Name"
                fullWidth
                margin="normal"
                type="text"
                autoComplete="off"
                error={false}
                // onChange={setNameField}
            >
                <TextField />
            </FormControl>

            <FormControl
                label="Doctors Information"
                fullWidth
                margin="normal"
                type="text"
                autoComplete="off"
                error={false}
                // onChange={setNameField}
            >
                <TextField />
            </FormControl>

            <FormControl
                label="Phone"
                fullWidth
                margin="normal"
                type="text"
                autoComplete="off"
                error={false}
            >
                <TextField />
            </FormControl>
            
            <CreatableSelect 
                isMulti
            />
              {/* <img src={`/uploads/${hospitalImg}`} alt="" /> */}
              </div>
    </div>
            
            
        </div>
    );

}