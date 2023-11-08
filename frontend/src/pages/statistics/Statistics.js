import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./statistics.css";
import SwipeableTemporaryDrawer from "../../components/SwipeableDrawer/SwipeableDrawer";
import { makeStyles } from "@mui/styles";
import { Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import { useAuth } from "../../context/auth/AuthContext";

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

const Statistics = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { auth } = useAuth();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <div>
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
          <Grid container spacing={2}>
            <Grid container item xs={12}>
              <Grid item xs={4}>
                <Paper
                  onClick={() =>
                    navigate(`/timeSpentAnalytics/${auth?.userInfo?._id}`)
                  }
                  className={classes.paper}
                >
                  Time spent Analytics
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>item</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>item</Paper>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <FormRow />
            </Grid>
            <Grid container item xs={12}>
              <FormRow />
            </Grid>
          </Grid>
          <Button
            className={classes.backButton}
            endIcon={<ArrowForward />}
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
