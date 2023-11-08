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
} from "../../../../context/market/MarketConstants";
import { useMarket } from "../../../../context/market/MarketContext";

const ItemsFilters = () => {
  const {
    selectedSortItemsByValue,
    setSelectedSortItemsByValue,
    selectedItemsByCondition,
    setSelectedItemsByCondition,
    selectedItemsByCategory,
    setSelectedItemsByCategory,
    setSearchItemsQuery,
    minItemsPrice,
    setMinItemsPrice,
    maxItemsPrice,
    setMaxItemsPrice,
  } = useMarket();

  const handleChange = (event) => {
    setSelectedSortItemsByValue(event.target.value);
  };

  const handleChangeConditionFilters = (event) => {
    setSelectedItemsByCondition(event.target.value);
  };

  const handleChangeCategoryFilters = (event) => {
    setSelectedItemsByCategory(event.target.value);
  };

  const resetFilters = () => {
    setMinItemsPrice("");
    setMaxItemsPrice("");
    setSearchItemsQuery("");
    setSelectedSortItemsByValue("");
    setSelectedItemsByCondition("");
    setSelectedItemsByCategory("");
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
          <Typography>Sort by {selectedSortItemsByValue}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {itemsSortFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedSortItemsByValue === item}
                    onChange={handleChange}
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
            Filter by Condition {selectedItemsByCondition}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {itemsConditionsFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedItemsByCondition === item}
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
          <Typography>Filter by Category {selectedItemsByCategory}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {itemsCategoryFilters.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={selectedItemsByCategory === item}
                    onChange={handleChangeCategoryFilters}
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
          value={minItemsPrice}
          onChange={(e) => setMinItemsPrice(e.target.value)}
          className="customTextField"
          label="Min Price"
          type="number"
        />

        <Typography style={{ margin: "0 10px" }}>to</Typography>

        <TextField
          variant="outlined"
          value={maxItemsPrice}
          onChange={(e) => setMaxItemsPrice(e.target.value)}
          className="customTextField"
          label="Max Price"
          type="number"
        />
      </div>
    </>
  );
};

export default ItemsFilters;
