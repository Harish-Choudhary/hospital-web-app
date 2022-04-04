import React from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { HospitalHeroArea } from "../../../components/user/singleHospital/HospitalHeroArea.component";
import { Header } from "../../../components/header/header";
import "./singleHospital.styles.css";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SignpostIcon from "@mui/icons-material/Signpost";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ContextApi } from "../../../App.js";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const SingleHospitalPage = () => {
  const [singleHospitalData, setSingleHospitalData] = React.useState([]);
  const [doctorsData, setDoctorsData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selecteDoctorName, setSelecteDoctorName] = React.useState("");

  const [userName, setUserName] = React.useState("");
  const [treatmentName, setTreatmentName] = React.useState("");
  const [dateValue, setDateValue] = React.useState(null);
  const [timeValue, setTimeValue] = React.useState(null);
  const [dateString, setDateString] = React.useState("");
  const [timeString, setTimeString] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [showMsg, setShowMsg] = React.useState(false);

  const navigate = useNavigate();

  const { hospitalId } = useParams();

  React.useEffect(() => {
    Axios.get(`http://localhost:5000/hospitals/${hospitalId}`)
      .then((res) => {
        setSingleHospitalData(res.data.data);
        setDoctorsData(res.data.doctorsData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setIsLoading(true);
    Axios.get("http://localhost:5000/auth/checkIsLogin", {
      withCredentials: true,
    }).then((res) => {
      setIsLoading(false);
      if (res.data.isLogin) {
        setIsLogin(true);
        setUserEmail(res.data.email);
      } else {
        setIsLogin(false);
      }
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const redirectToLoginPage = () => {
    navigate({
      pathname: "/signup",
    });
  };

  const setDoctorName = (e) => {
    setSelecteDoctorName(e.target.value);
  };

  const setDate = (e) => {
    let dateArray = e.toString().split(" ");
    let exactDateArray = dateArray.splice(0, 4);
    setDateString(exactDateArray.toString());
    setDateValue(e);
  };

  const setTime = (e) => {
    setTimeString(e.toString().split(" ")[4]);
    setTimeValue(e);
  };

  const bookAppointment = (doctorName) => {
    setIsLoading(true);
    Axios.post(`http://localhost:5000/book/appointment/${hospitalId}`, {
      userName: userName,
      treatmentFor: treatmentName,
      selectedDoctor: selecteDoctorName,
      appointmentDate: dateString,
      appointmentTime: timeString,
      userEmail: userEmail,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.data.code == 1) {
          setShowMsg(true);
          setMsg(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setShowMsg(true);
        setMsg("There was some error, Please try again.");
      });
  };

  const selectUserName = (e) => {
    setUserName(e.target.value);
  };

  const selectTreatmentName = (e) => {
    setTreatmentName(e.target.value);
  };

  const closeMsgDialog = () => {
    setOpen(false);
    showMsg(false);
  }

  return (
    <div>
      <Header />
      {singleHospitalData.map((data) => (
        <div key={data.hospital_registration_nos}>
          <HospitalHeroArea
            hospitalName={data.hospital_name}
            hospitalCity={data.city}
            hospitalImage={data.image}
          />
          <div className="aboutHospitalInfoArea">
            <h2 className="singleHospitalPageH2">About {data.hospital_name}</h2>
            <p>{data.about}</p>
          </div>

          {/* Contact section */}
          <div className="contactSectionSHP">
            <div className="contactSectionSHPchild">
              <p>Contact</p>
              <span className="shpcontactspan">
                <CallIcon />
                <span>
                  <a href={"tel:" + data.contact_nos}>{data.contact_nos}</a>
                </span>
              </span>
            </div>
            <div className="contactSectionSHPchild">
              <p>Pincode</p>
              <span className="shpcontactspan">
                <SignpostIcon />
                <span>{data.pincode}</span>
              </span>
            </div>
            <div className="contactSectionSHPchild">
              <p>Location</p>
              <span className="shpcontactspan">
                <LocationOnIcon />
                <span>{data.city}</span>
              </span>
            </div>
            <div className="contactSectionSHPchild">
              <p>Hospital Admin</p>
              <span className="shpcontactspan">
                <AccessibleIcon />
                <span>{data.user_name}</span>
              </span>
            </div>
          </div>
        </div>
      ))}

      <h2
        style={{
          margin: "10px 30px",
          color: "#383cc1",
          fontWeight: "500",
          fontSize: "20px",
          padding: "10px 0",
        }}
      >
        Our Doctors
      </h2>
      <div className="doctorsListArea">
        {doctorsData.map((doctor) => (
          <div key={doctor.name} className="singleDoctor">
            <div className="docImage">
              <img src={`/hospital/${doctor.regno}/${doctor.photo}`} alt="" />
            </div>
            <div className="docInfo">
              <p className="doctName">{doctor.name}</p>
              <p className="docShortInfo">{doctor.bio.substring(10) + "..."}</p>
              <Button
                variant="contained"
                sx={{
                  fontSize: "12px",
                  padding: "5px",
                  fontFamily: "poppins",
                  textTransform: "none",
                  fontWeight: 400,
                  margin: "5px 0",
                }}
                onClick={handleClickOpen}
              >
                Book Appointment
              </Button>
            </div>

            <Dialog
              open={open}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
              disableEscapeKeyDown={false}
            >
              {showMsg ? (
                <div>
                  <DialogTitle sx={{ fontFamily: "poppins" }}>
                    Appointment Status
                  </DialogTitle>
                  <DialogContent>
                    <p>{msg}</p>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closeMsgDialog}>Ok</Button>
                  </DialogActions>
                </div>
              ) : (
                <div>
                  <DialogTitle sx={{ fontFamily: "poppins" }}>
                    {"Book an Appointment in Nikam Hospital"}
                  </DialogTitle>
                  {isLoading ? (
                    <Skeleton
                      sx={{
                        width: "90%",
                        margin: "auto",
                        marginBottom: "10px",
                        paddingBottom: "10px",
                      }}
                      animation="wave"
                    />
                  ) : (
                    <div>
                      {isLogin ? (
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            <TextField
                              margin="normal"
                              fullWidth
                              label="Full Name"
                              onChange={selectUserName}
                            />
                            <TextField
                              margin="normal"
                              fullWidth
                              label="Appointment for"
                              onChange={selectTreatmentName}
                            />

                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Doctor
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selecteDoctorName}
                                label="Doctor"
                                onChange={setDoctorName}
                              >
                                {doctorsData.map((doctor) => {
                                  return (
                                    <MenuItem value={`${doctor.name}`}>
                                      {doctor.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>

                            <div
                              className="dateTimePicker"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                margin: "15px 0",
                              }}
                            >
                              <div
                                style={{
                                  marginRight: "10px",
                                }}
                              >
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <DatePicker
                                    label="Pick Date"
                                    value={dateValue}
                                    onChange={setDate}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>

                              <div
                                style={{
                                  marginLeft: "10px",
                                }}
                              >
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <TimePicker
                                    label="Basic example"
                                    value={timeValue}
                                    onChange={setTime}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            </div>
                          </DialogContentText>
                        </DialogContent>
                      ) : (
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            <p>
                              You are not logged in, Kindly login to book an
                              appointment.
                            </p>
                          </DialogContentText>
                        </DialogContent>
                      )}
                      <DialogActions>
                        <Button
                          sx={{ fontFamily: "poppins", textTransform: "none" }}
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                        {isLogin ? (
                          <Button
                            sx={{
                              fontFamily: "poppins",
                              textTransform: "none",
                            }}
                            onClick={bookAppointment}
                          >
                            Book
                          </Button>
                        ) : (
                          <Button
                            sx={{
                              fontFamily: "poppins",
                              textTransform: "none",
                            }}
                            onClick={redirectToLoginPage}
                          >
                            Login
                          </Button>
                        )}
                      </DialogActions>
                    </div>
                  )}
                </div>
              )}
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};
