import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth/AuthContext";
import { makeStyles } from "@mui/styles";
import { PlayCircleOutline, Tv } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import TimeSpentAnalytics from "../timeSpentAnalytics/TimeSpentAnalytics";
import NoAnalyticData from "../noAnalyticsData/NoAnalyticsData";
import { getTimeSpentInApp } from "../../../Api/ServerAPI";
import Topbar from "../../../components/topbar/Topbar";
import SwipeableTemporaryDrawer from "../../../components/SwipeableDrawer/SwipeableDrawer";
import { useParams } from "react-router";

const generateRandomColor = () => {
  const minBrightness = 0.6; // Minimum brightness value (0-1)
  let color = "#000000"; // Start with black color

  //   while (color === "#000000") {
  //     // Generate random RGB values
  //     const red = Math.floor(Math.random() * 256);
  //     const green = Math.floor(Math.random() * 256);
  //     const blue = Math.floor(Math.random() * 256);

  //     // Calculate brightness of the color
  //     const brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;

  //     // Check if the brightness is higher than the minimum
  //     if (brightness >= minBrightness) {
  //       // Convert RGB values to hex format
  //       color = `#${red.toString(16).padStart(2, "0")}${green
  //         .toString(16)
  //         .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
  //     }
  //   }

  return color;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "black",
    color: generateRandomColor(),
    border: `1px solid ${generateRandomColor()}`,
    "&.Mui-selected": {
      backgroundColor: generateRandomColor(),
      color: "black",
      "&:hover": {
        backgroundColor: generateRandomColor(),
      },
    },
  },
}));

const AnalyticsDashboard = () => {
  const [timeSpent, setTimeSpent] = useState([]);
  const { auth, setAuth } = useAuth();
  const classes = useStyles();
  const { userId } = useParams();

  useEffect(() => {
    const fetchTimeSpent = async () => {
      try {
        const { data } = await getTimeSpentInApp(userId);
        console.log(data);
        // Convert timeSpent field to minutes and exclude _id and id fields
        const convertedData = data.timeSpentInApp.map(
          ({ _id, id, timeSpent, ...rest }) => {
            const convertedTimeSpent = parseFloat(
              (timeSpent / 60000).toFixed(2)
            ); // Convert milliseconds to minutes
            return { ...rest, timeSpent: convertedTimeSpent };
          }
        );

        // Sort the data based on the date field in descending order
        const sortedData = convertedData.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        setTimeSpent(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTimeSpent();
  }, [userId]);

  return (
    <div className={classes.root}>
      <SwipeableTemporaryDrawer />
      <Topbar />

      {timeSpent?.length === 0 ? (
        <>
          <NoAnalyticData />
        </>
      ) : (
        <>
          <h1
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              color: generateRandomColor(),
            }}
          >
            Time Spent In App (In Minutes)
          </h1>

          <TimeSpentAnalytics timeSpent={timeSpent} />
        </>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
