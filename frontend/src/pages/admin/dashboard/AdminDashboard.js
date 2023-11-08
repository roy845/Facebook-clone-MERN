import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router";
import Topbar from "../../../components/topbar/Topbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useAuth } from "../../../context/auth/AuthContext";
import { Button, Container, Grid, Paper } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import WifiIcon from "@mui/icons-material/Wifi";
import SwipeableTemporaryDrawer from "../../../components/SwipeableDrawer/SwipeableDrawer";
import { makeStyles } from "@mui/styles";
import { Text } from "@chakra-ui/react";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    fontSize: "24px",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid white",
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
    transition: "background-color 0.3s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#558dab",
    },
    width: "95%", // Adjusted width to fit the container
    height: 250,
    marginTop: 20,
    marginLeft: 10,
  },
  backButton: {
    marginTop: "16px",
    backgroundColor: "black",
    border: "1px solid white",
    color: "white",
    justifyContent: "flex-end",
    "&:hover": {
      backgroundColor: "#558dab",
    },
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const menuItems = [
    {
      name: "Users Management",
      icon: <PeopleIcon />,
      onClick: () => {
        navigate("/admin/users");
      },
    },
    {
      name: "Users statistics",
      icon: <BarChartIcon />,
      onClick: () => {
        navigate("/admin/users/statistics");
      },
    },
    {
      name: "Active users",
      icon: <WifiIcon />,
      onClick: () => {
        navigate("/admin/users/activeUsers");
      },
    },
  ];

  return (
    <>
      <SwipeableTemporaryDrawer />
      <Topbar />
      <div className="adminContainer" style={{ display: "flex" }}>
        <Sidebar />
        <div
          className="content"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Text fontSize={28} fontWeight="bold">
            Dashboard
          </Text>
          <Container maxWidth="sm">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {auth?.userInfo?.isAdmin ? (
                <Grid
                  container
                  spacing={3}
                  sx={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  {menuItems.map((box, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper onClick={box.onClick} className={classes.paper}>
                        {box.icon} {box.name}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {menuItems.map((box, index) => (
                    <div key={index} style={{ margin: "1rem" }}>
                      <Paper onClick={box.onClick} className={classes.paper}>
                        {box.icon} {box.name}
                      </Paper>
                    </div>
                  ))}
                </div>
              )}
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
