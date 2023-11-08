import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AvailabilitySelect from "../availabilitySelect/AvailabilitySelect";
import { TextField, TextareaAutosize } from "@mui/material";
import CountrySelect from "../../../../components/countrySelect/CountrySelect";
import CitySelect from "../../../../components/citySelect/CitySelect";
import { useItems } from "../../../../context/items/ItemsContext";

export default function MoreDetails() {
  const [expanded, setExpanded] = useState(false);

  const {
    description,
    setDescription,
    country,
    setCountry,
    city,
    setCity,
    productTags,
    setProductTags,
    showCities,
    setShowCities,
  } = useItems();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "120px" }}>More details</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Attract more interest by including more details.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextareaAutosize
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minRows={10}
              style={{ width: "320px", marginBottom: "5px" }}
              placeholder="Description"
            />
            <AvailabilitySelect />
            <TextField
              style={{ width: "320px" }}
              variant="outlined"
              margin="normal"
              placeholder="Product Tags #"
              label="Product Tags"
              id="Product Tags"
              name="Product Tags"
              autoComplete="Product Tags"
              value={productTags}
              onChange={(e) => setProductTags(e.target.value)}
            />
            <CountrySelect
              setCountry={setCountry}
              setShowCities={setShowCities}
            />
            {showCities && <CitySelect country={country} setCity={setCity} />}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
