import "./newListingCard.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const NewListingCard = ({ title, subTitle, image, onClick }) => {
  return (
    <div>
      <Card
        sx={{ maxWidth: 350, cursor: "pointer", border: "1px gray solid" }}
        onClick={onClick}
        className="card-hover"
      >
        <CardMedia sx={{ height: 240 }} image={image} title="" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subTitle}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewListingCard;
