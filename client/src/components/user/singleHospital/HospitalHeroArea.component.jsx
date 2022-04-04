import React from "react";
import './HospitalHeroArea.styles.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';


export const HospitalHeroArea = ({hospitalName, hospitalImage, hospitalCity, }) => {
    return (
        <div className="singleHospitalHeroArea">
            <div className="rightTitleHHA">
                <h1>{hospitalName}</h1>
                <p><span><LocationOnIcon sx={{
                    fontSize: '15px'
                }}/>{hospitalCity}</span></p>
            </div>
            <div className="leftImageHHA">
                <img className="singleHospitalHeroAreaImage" src={`/uploads/${hospitalImage}`} alt="" />
            </div>
        </div>
    )
}