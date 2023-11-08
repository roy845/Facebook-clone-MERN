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
  airConditioningFilters,
  catFriendlyFilters,
  dogFriendlyFilters,
  heatingTypeFilters,
  parkingTypeFilters,
  propertiesSortFilters,
  propertyBathroomsFilters,
  propertyBedroomsFilters,
  propertyTypeFilters,
  washingMachineFilters,
} from "../../../../context/market/MarketConstants";
import { useMarket } from "../../../../context/market/MarketContext";

const PropertiesFilters = () => {
  const {
    setSearchPropertyQuery,
    selectedSortPropertyByValue,
    setSelectedSortPropertyByValue,
    selectedPropertyByType,
    setSelectedPropertyByType,
    selectedPropertyByBedrooms,
    setSelectedPropertyByBedrooms,
    selectedPropertyByBathrooms,
    setSelectedPropertyByBathrooms,
    selectedPropertyByWashingMachine,
    setSelectedPropertyByWashingMachine,
    selectedPropertyParkingType,
    setSelectedPropertyParkingType,
    selectedPropertyByAirconditioning,
    setSelectedPropertyByAirconditioning,
    selectedPropertyByHeatingType,
    setSelectedPropertyByHeatingType,
    selectedPropertyByCatFriendly,
    setSelectedPropertyByCatFriendly,
    selectedPropertyByDogFriendly,
    setSelectedPropertyByDogFriendly,
    squareFeetMin,
    setSquareFeetMin,
    squareFeetMax,
    setSquareFeetMax,
    minPropertyPrice,
    setMinPropertyPrice,
    maxPropertyPrice,
    setMaxPropertyPrice,
  } = useMarket();

  const handleChangeSortPropertyByValue = (event) => {
    setSelectedSortPropertyByValue(event.target.value);
  };

  const handleChangeTypeFilters = (event) => {
    setSelectedPropertyByType(event.target.value);
  };

  const handleChangeBedroomsFilters = (event) => {
    setSelectedPropertyByBedrooms(event.target.value);
  };
  const handleChangeBathroomsFilters = (event) => {
    setSelectedPropertyByBathrooms(event.target.value);
  };

  const handleChangeWashingMachineFilters = (event) => {
    setSelectedPropertyByWashingMachine(event.target.value);
  };
  const handleChangeParkingTypeFilters = (event) => {
    setSelectedPropertyParkingType(event.target.value);
  };
  const handleChangeAirconditioningFilters = (event) => {
    setSelectedPropertyByAirconditioning(event.target.value);
  };
  const handleChangeHeatingTypeFilters = (event) => {
    setSelectedPropertyByHeatingType(event.target.value);
  };
  const handleChangeCatFriendlyFilters = (event) => {
    setSelectedPropertyByCatFriendly(event.target.value);
  };
  const handleChangeDogFriendlyFilters = (event) => {
    setSelectedPropertyByDogFriendly(event.target.value);
  };

  const resetFilters = () => {
    setSearchPropertyQuery("");
    setSelectedSortPropertyByValue("");
    setSelectedPropertyByType("");
    setSelectedPropertyByBedrooms("");
    setSelectedPropertyByBathrooms("");
    setSelectedPropertyByWashingMachine("");
    setSelectedPropertyParkingType("");
    setSelectedPropertyByAirconditioning("");
    setSelectedPropertyByHeatingType("");
    setSelectedPropertyByCatFriendly("");
    setSelectedPropertyByDogFriendly("");
    setSquareFeetMin("");
    setSquareFeetMax("");
    setMinPropertyPrice("");
    setMaxPropertyPrice("");
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
          <Typography>Sort by {selectedSortPropertyByValue}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {propertiesSortFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedSortPropertyByValue === item}
                    onChange={handleChangeSortPropertyByValue}
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
          <Typography>Filter by Type {selectedPropertyByType}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {propertyTypeFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedPropertyByType === item}
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
            Filter by Bedrooms {selectedPropertyByBedrooms}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {propertyBedroomsFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedPropertyByBedrooms === item}
                    onChange={handleChangeBedroomsFilters}
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
            Filter by Bathrooms {selectedPropertyByBathrooms}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {propertyBathroomsFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedPropertyByBathrooms === item}
                    onChange={handleChangeBathroomsFilters}
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
            Filter by washing machine {selectedPropertyByWashingMachine}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {washingMachineFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedPropertyByWashingMachine === item}
                    onChange={handleChangeWashingMachineFilters}
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
            Filter by parking type {selectedPropertyParkingType}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {parkingTypeFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedPropertyParkingType === item}
                    onChange={handleChangeParkingTypeFilters}
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
            Filter by air conditioning {selectedPropertyByAirconditioning}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {airConditioningFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedPropertyByAirconditioning === item}
                    onChange={handleChangeAirconditioningFilters}
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
            Filter by heating type {selectedPropertyByHeatingType}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {heatingTypeFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedPropertyByHeatingType === item}
                    onChange={handleChangeHeatingTypeFilters}
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
            Filter by cat friendly house {selectedPropertyByCatFriendly}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {catFriendlyFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedPropertyByCatFriendly === item}
                    onChange={handleChangeCatFriendlyFilters}
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
            Filter by dog friendly house {selectedPropertyByCatFriendly}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {dogFriendlyFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedPropertyByDogFriendly === item}
                    onChange={handleChangeDogFriendlyFilters}
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
          value={minPropertyPrice}
          onChange={(e) => setMinPropertyPrice(e.target.value)}
          className="customTextField"
          label="Min Price"
          type="number"
        />

        <Typography style={{ margin: "0 10px" }}>to</Typography>

        <TextField
          variant="outlined"
          value={maxPropertyPrice}
          onChange={(e) => setMaxPropertyPrice(e.target.value)}
          className="customTextField"
          label="Max Price"
          type="number"
        />
      </div>
      <h3
        style={{ marginTop: "10px", marginBottom: "10px" }}
        className="sidebarListItemText"
      >
        Square feet
      </h3>

      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          value={squareFeetMin}
          onChange={(e) => setSquareFeetMin(e.target.value)}
          className="customTextField"
          label="Min."
          type="number"
        />

        <Typography style={{ margin: "0 10px" }}>to</Typography>

        <TextField
          variant="outlined"
          value={squareFeetMax}
          onChange={(e) => setSquareFeetMax(e.target.value)}
          className="customTextField"
          label="Max."
          type="number"
        />
      </div>
    </>
  );
};

export default PropertiesFilters;
