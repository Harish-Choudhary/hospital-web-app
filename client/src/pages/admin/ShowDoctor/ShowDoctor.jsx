import React, { useEffect, useState } from "react"
import Axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export const ShowDoctor = (props) => {
    const [doctorsData, setDoctorsData] = useState([]);
    const [noData, setNoData] = useState(false);


    useEffect(() => {
        Axios.get("http://localhost:5000/dashboard/hospital/show/doctor", { withCredentials: true }).then(
            res => {
                console.log(res.data.code)
                if (res.data.code == 1) {
                    setDoctorsData(res.data.data);
                    setNoData(false);
                }
                else {
                    setNoData(true);
                }

            }

        )
    }, [])


    return (
        <div style={props.shouldShow ? { display: "block" } : { display: "none" }}>
            {
                noData ? <h3>No doctors found</h3> : <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Doctor Name</TableCell>
                                    <TableCell align="right">Mobile No.</TableCell>
                                    <TableCell align="right">Speciality&nbsp;</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doctorsData.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right"><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></TableCell>

                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.phone}</TableCell>
                                        <TableCell align="right">{row.tag}</TableCell>
                                        <TableCell align="right"><EditIcon/></TableCell>
                                        <TableCell align="right"><DeleteIcon/></TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            }
        </div>
    )
}