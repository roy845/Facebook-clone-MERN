import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function StoryTabs({
  imagesCarousel,
  songsCarousel,
  videosCarousel,
  imagesLength,
  songsLength,
  videosLength,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "white", // White underline color
            },
            "& .MuiTab-root": {
              color: "white", // White text color
            },
          }}
        >
          {imagesLength > 0 && <Tab label="Images" {...a11yProps(0)} />}
          {songsLength > 0 && <Tab label="Songs" {...a11yProps(1)} />}
          {videosLength > 0 && <Tab label="Videos" {...a11yProps(2)} />}
        </Tabs>
      </Box>
      {imagesLength > 0 && (
        <CustomTabPanel value={value} index={0}>
          {imagesCarousel}
        </CustomTabPanel>
      )}
      {songsLength > 0 && (
        <CustomTabPanel value={value} index={1}>
          {songsCarousel}
        </CustomTabPanel>
      )}
      {videosLength > 0 && (
        <CustomTabPanel value={value} index={2}>
          {videosCarousel}
        </CustomTabPanel>
      )}
    </Box>
  );
}
