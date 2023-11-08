import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import { Button, Tooltip } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const FilterPosts = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  resetPosts,
  handleFilterPosts,
}) => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <DatePicker
          value={fromDate}
          onChange={(date) => setFromDate(date)}
          sx={{ mt: "20px" }}
          placeholder="From date"
          type="date"
          fullWidth
        />
        <br />
        <ArrowForwardIosIcon sx={{ marginTop: "20px", marginLeft: "5px" }} />
        <Box width={10} />
        <DatePicker
          value={toDate}
          onChange={(date) => setToDate(date)}
          sx={{ mt: "20px" }}
          placeholder="To date"
          type="date"
          fullWidth
        />
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          marginBottom: "10px",
          justifyContent: "space-between",
        }}
      >
        {fromDate && toDate && (
          <Button onClick={handleFilterPosts} variant="contained">
            Filter Posts
          </Button>
        )}
        {fromDate && toDate && (
          <Button
            onClick={resetPosts}
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            Reset
          </Button>
        )}
      </div>
    </>
  );
};

export default FilterPosts;
