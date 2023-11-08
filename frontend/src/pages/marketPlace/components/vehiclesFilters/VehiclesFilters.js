import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Button,
  AccordionDetails,
  Typography,
  Radio,
  FormControlLabel,
  TextField,
} from "@mui/material";

import {
  itemsCategoryFilters,
  itemsConditionsFilters,
  itemsSortFilters,
  vehiclesBodyStyleFilters,
  vehiclesConditionsFilters,
  vehiclesFuelTypeFilters,
  vehiclesSortFilters,
  vehiclesTransmissionsFilters,
  vehiclesTypesFilters,
} from "../../../../context/market/MarketConstants";
import { useMarket } from "../../../../context/market/MarketContext";

const VehiclesFilters = () => {
  const {
    selectedSortVehiclesByValue,
    setSelectedSortVehiclesByValue,
    selectedVehiclesByType,
    setSelectedVehiclesByType,
    selectedVehiclesByBodyStyle,
    setSelectedVehiclesByBodyStyle,
    selectedVehiclesByCondition,
    setSelectedVehiclesByCondition,
    selectedVehiclesByFuelType,
    setSelectedVehiclesByFuelType,
    selectedVehiclesByTransmission,
    setSelectedVehiclesByTransmission,
    minVehiclesPrice,
    setMinVehiclesPrice,
    maxVehiclesPrice,
    setMaxVehiclesPrice,
    setSearchVehiclesQuery,
  } = useMarket();

  const handleChangeSortVehiclesByValue = (event) => {
    setSelectedSortVehiclesByValue(event.target.value);
  };

  const handleChangeTypeFilters = (event) => {
    setSelectedVehiclesByType(event.target.value);
  };

  const handleChangeBodyStyleFilters = (event) => {
    setSelectedVehiclesByBodyStyle(event.target.value);
  };
  const handleChangeConditionFilters = (event) => {
    setSelectedVehiclesByCondition(event.target.value);
  };
  const handleChangeFuelTypeFilters = (event) => {
    setSelectedVehiclesByFuelType(event.target.value);
  };
  const handleChangeTransmissionFilters = (event) => {
    setSelectedVehiclesByTransmission(event.target.value);
  };

  const resetFilters = () => {
    setSelectedSortVehiclesByValue("");
    setSearchVehiclesQuery("");
    setSelectedVehiclesByType("");
    setSelectedVehiclesByBodyStyle("");
    setSelectedVehiclesByCondition("");
    setSelectedVehiclesByFuelType("");
    setSelectedVehiclesByTransmission("");
    setMinVehiclesPrice("");
    setMaxVehiclesPrice("");
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 className="sidebarListItemText">Filters</h3>
        <Button
          style={{
            backgroundColor: "red",
            color: "white",
            marginBottom: "10px",
          }}
          onClick={resetFilters}
        >
          Reset filters
        </Button>
      </div>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sort by {selectedSortVehiclesByValue}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {vehiclesSortFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedSortVehiclesByValue === item}
                    onChange={handleChangeSortVehiclesByValue}
                    value={item}
                    name="radio-buttons"
                  />
                }
                label={item}
              />
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter by Type {selectedVehiclesByType}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {vehiclesTypesFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedVehiclesByType === item}
                    onChange={handleChangeTypeFilters}
                    value={item}
                    name="radio-buttons"
                  />
                }
                label={item}
              />
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            Filter by Body style {selectedVehiclesByBodyStyle}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {vehiclesBodyStyleFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedVehiclesByBodyStyle === item}
                    onChange={handleChangeBodyStyleFilters}
                    value={item}
                    name="radio-buttons"
                  />
                }
                label={item}
              />
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            Filter by Condition {selectedVehiclesByCondition}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {vehiclesConditionsFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedVehiclesByCondition === item}
                    onChange={handleChangeConditionFilters}
                    value={item}
                    name="radio-buttons"
                  />
                }
                label={item}
              />
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            Filter by Fuel type {selectedVehiclesByFuelType}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {vehiclesFuelTypeFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedVehiclesByFuelType === item}
                    onChange={handleChangeFuelTypeFilters}
                    value={item}
                    name="radio-buttons"
                  />
                }
                label={item}
              />
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            Filter by Transmission {selectedVehiclesByTransmission}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {vehiclesTransmissionsFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedVehiclesByTransmission === item}
                    onChange={handleChangeTransmissionFilters}
                    value={item}
                    name="radio-buttons"
                  />
                }
                label={item}
              />
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <h3
        style={{ marginTop: "10px", marginBottom: "10px" }}
        className="sidebarListItemText"
      >
        Price
      </h3>

      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          value={minVehiclesPrice}
          onChange={(e) => setMinVehiclesPrice(e.target.value)}
          className="customTextField"
          label="Min Price"
          type="number"
        />

        <Typography style={{ margin: "0 10px" }}>to</Typography>

        <TextField
          variant="outlined"
          value={maxVehiclesPrice}
          onChange={(e) => setMaxVehiclesPrice(e.target.value)}
          className="customTextField"
          label="Max Price"
          type="number"
        />
      </div>
    </>
  );
};

export default VehiclesFilters;
