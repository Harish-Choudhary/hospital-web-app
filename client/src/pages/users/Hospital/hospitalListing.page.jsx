import React, { useEffect, useState } from "react";
import { HospitalCard } from "../../../components/user/hospitalListing/hospitalCards.component";
import hospitalImage from "../../../images/contemplative-reptile.jpg";
import Axios from "axios";
import "./hospitalListing.styles.css";
import { Header } from "../../../components/header/header";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

export const HospitalListingPage = () => {
  const [activeTab, setActiveTab] = useState("searchByName");
  const [hospitalsData, setHospitalsData] = useState([]);
  const [searchData, setSearchData] = useState("");


  useEffect(() => {
    Axios.get("http://localhost:5000/hospitals", { withCredentials: true })
      .then((res) => {
        setHospitalsData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  const userSearchTerm = (e) => {
    // console.log(e.target.value);
    setSearchData(e.target.value);
  };

  return (
    <div className="hospitalListingPage">
      <Header />
      <div className="hospitalListingHeader">
        <span className="hospitalListingHeaderSpan">
          <div className="hospitalListingHeaderTabs">
            <button
              className={
                activeTab == "searchByName"
                  ? "activeTab tabsButtonLPheader"
                  : "tabsButtonLPheader"
              }
              onClick={() => setActiveTab("searchByName")}
            >
              Search By Name
            </button>
            <button
              className={
                activeTab == "searchByLocation"
                  ? "activeTab tabsButtonLPheader"
                  : "tabsButtonLPheader"
              }
              onClick={() => setActiveTab("searchByLocation")}
            >
              Search By Location
            </button>
            <button
              className={
                activeTab == "searchByLocationAndTreatment"
                  ? "activeTab tabsButtonLPheader"
                  : "tabsButtonLPheader"
              }
              onClick={() => setActiveTab("searchByLocationAndTreatment")}
            >
              Search By Location and Treatment
            </button>
          </div>
          <input
            style={
              activeTab == "searchByName"
                ? { display: "block" }
                : { display: "none" }
            }
            onChange={userSearchTerm}
            type="text"
            placeholder="Search for hospitals"
          />
          <button
            className="searchByLocationBtn"
            style={
              activeTab == "searchByLocation"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            Hold on we are dectecting your Location
          </button>

          <div
            style={
              activeTab == "searchByLocationAndTreatment"
                ? { display: "block" }
                : { display: "none" }
            }
            className="searchByLocationAndTreatmentDiv"
          >
            <input type="text" placeholder="Search for hospitals" />
            <input type="text" placeholder="Search for hospitals" />
            <input type="button" value="Search" />
          </div>
        </span>
      </div>

      <div className="hospitalCards">
        {hospitalsData
          .filter((data) => data.hospital_name.toLowerCase().includes(searchData.toLowerCase()))
          .map((hospital) => (
            <HospitalCard
              name={hospital.hospital_name}
              image={`/uploads/${hospital.image}`}
              info={hospital.about.substring(0, 200) + "..."}
              url={hospital.hospital_registration_nos}
              key={hospital.hospital_registration_nos}
            />
          ))}
      </div>
    </div>
  );
};
