import React,{useState} from "react";
import { FormControl, TextField } from "@mui/material";
import CreatableSelect from 'react-select/creatable'
import { SideBar } from "../../../components/admin/sidebar/admin.sidebar";
import '../adminHome/AdminHomePage.css'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Axios from 'axios';

const Input = styled('input')({
    display: 'none',
});



export const AddDoctor = (props) => {
    const [doctorName , setDoctorName] = useState('')
    const [doctorInfo , setDoctorInfo] = useState('')
    const [doctorPhone , setDoctorPhone] =  useState('')
    const [doctorTags , setDoctorTags] = useState("");
    const [doctorImage , setDoctorImage] = useState();
    let tags =[];
    const selectDoctorImage = (e) =>{
        setDoctorImage(e.target.files[0]);
    }

    const setDocValue = (e) => {
        setDoctorName(e.target.value)
    }

    const DoctorInfoHelper = (e)=>{
        setDoctorInfo(e.target.value);
    }
    
    const TagsHelper=(e)=>{
        for(let i = 0; i<e.length; i++){
            tags.push(e[i].value)
        }
        setDoctorTags(tags.toString())
    }
    
    const PhoneHelper=(e)=>{
        setDoctorPhone(e.target.value);
    }
    console.log(doctorTags)
    const addDoctor=()=>{
        let formData = new FormData();
        formData.append('doctorName',doctorName);
        formData.append('doctorPhone',doctorPhone);
        formData.append('doctorInfo',doctorInfo);
        formData.append('doctorTags',doctorTags);
        formData.append('file',doctorImage);
        Axios.post('http://localhost:5000/dashboard/hospital/add/doctor',formData,{withCredentials:true},{
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
    }
    return (
        <div style={props.shouldShow ? { display: "block" } : { display: "none" }}>


            <div className="homePage">
                
                <div className="dashBoardDiv">
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={selectDoctorImage}/>
                    <Button variant="contained" component="span">
                        Upload Image
                    </Button>
                </label>
                    <FormControl
                        label="Doctor Name"
                        fullWidth
                        margin="normal"
                        type="text"
                        autoComplete="off"
                        error={false}
                    // onChange={setNameField}
                    >
                        <TextField label="Doctor Name" onChange={setDocValue}/>
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
                        <TextField label="Doctors Information" onChange={DoctorInfoHelper}/>
                    </FormControl>

                    <FormControl
                        label="Phone"
                        fullWidth
                        margin="normal"
                        type="text"
                        autoComplete="off"
                        error={false}
                    >
                        <TextField label="Phone" onChange={PhoneHelper}/>
                    </FormControl>

                    <div style={{marginTop: "20px"}}>
                    <CreatableSelect
                        isMulti
                        placeholder="Tags"
                        onChange={TagsHelper}
                    />
                    </div>
                    

                    <Button sx={{
                        marginTop: '20px'
                    }} variant='contained' onClick={addDoctor}>Add Doctor</Button>
                </div>
            </div>


        </div>
    );

}