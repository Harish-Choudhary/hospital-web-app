import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { List, ListItem, ListItemText, ListItemButton, Box, ListItemIcon } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Collapse from '@mui/material/Collapse';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import './admin.sidebar.css'
import { useNavigate } from 'react-router-dom'




// const [showDashboard,setShowDashboard] = useState(true);
// const [showAddDoctor, setShowAddDoctor] = useState(false);
// const [showDoctors, setShowDoctors] = useState(false);
// const [showAppointments, setShowAppointments] = useState(false);



export const SideBar = ({setShowAddDoctor, setShowAppointments, setShowDashboar, setShowDoctors}) => {

    const navigate = useNavigate()

    const [openDoctors, setOpenDoctors] = React.useState(false);
    const [openAppointments, setOpenAppointments] = React.useState(false);
    const [open, setOpen] = React.useState(false)

    const handleClickDoctor = () => {
        setOpenDoctors(!openDoctors);
    };

    const handleClickAppointments = () => {
        setOpenAppointments(!openAppointments);
    };

    const setAddDoctor = () => {
        setShowAddDoctor(true)
        setShowAppointments(false);
        setShowDashboar(false);
        setShowDoctors(false)
    }

    const showAllDoctPage = () => {
        setShowAddDoctor(false)
        setShowAppointments(false);
        setShowDashboar(false);
        setShowDoctors(true)
    }

    const showAppointments = () => {
        setShowAddDoctor(false)
        setShowAppointments(true);
        setShowDashboar(false);
        setShowDoctors(false)
    }

    const showDashboard = () => {
        setShowAddDoctor(false)
        setShowAppointments(false);
        setShowDashboar(true);
        setShowDoctors(false)
    }

    
    return (
        <div className="Sidebar">
            <div className='Upper'>
                <div className='DashboardLogo'>
                    <h1>HealthAura</h1>
                </div>
            </div>

            <div className='Lower'>
                <Box sx={{fontFamily: "poppins"}}>
                    <List sx={{fontFamily: "poppins"}}>
                        <ListItem disablePadding onClick={showDashboard}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PaletteIcon />
                                </ListItemIcon>
                                <ListItemText sx={{fontFamily: "poppins"}} primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding >
                        </ListItem>

                        <ListItemButton onClick={handleClickDoctor}>
                            <ListItemIcon>
                                <MedicalServicesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Doctors" />
                            {openDoctors ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openDoctors} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding onClick={setAddDoctor}>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Doctor" />
                                </ListItemButton>
                            </List>
                            <List component="div" onClick={showAllDoctPage}>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <VisibilityIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="All Doctors" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItemButton onClick={handleClickAppointments}>
                            <ListItemIcon>
                                <GroupAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Appointments" />
                            {openAppointments ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openAppointments} timeout="auto" unmountOnExit>


                            <List component="div" disablePadding onClick={showAppointments}>
                                <ListItemButton sx={{ pl: 4 }} >
                                    <ListItemIcon >
                                        <VisibilityIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="All Appointments" />
                                </ListItemButton>
                            </List>
                        </Collapse>


                        <ListItem disablePadding >
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItemButton>

                        </ListItem>
                    </List>
                </Box>
            </div>
        </div>
    );
}