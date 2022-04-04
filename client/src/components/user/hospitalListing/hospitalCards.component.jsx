import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HospitalCard = ({image, name, info, url}) => {

    const navigate = useNavigate();

    const openSingleHospital = () => {
        navigate(`${url}`)
    }

  return (
    <div>
      <Card sx={{ maxWidth: 400}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">{info}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={openSingleHospital} size="small" color="primary">
            Check
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};