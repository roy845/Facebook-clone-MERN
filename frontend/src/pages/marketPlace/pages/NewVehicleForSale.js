import { Box } from "@mui/system";
import SwipeableTemporaryDrawer from "../../../components/SwipeableDrawer/SwipeableDrawer";
import Topbar from "../../../components/topbar/Topbar";
import SidebarMarketPlace from "../components/sideBar/SidebarMarketPlace";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import NewVehicleCard from "../components/newVehicleCard/NewVehicleCard";
import VehicleTypesSelect from "../components/vehicleTypesSelect/VehicleTypesSelect";
import CountrySelect from "../../../components/countrySelect/CountrySelect";
import CitySelect from "../../../components/citySelect/CitySelect";
import { useVehicles } from "../../../context/vehicles/VehiclesContext";
import YearsSelect from "../components/yearsSelect/YearsSelect";
import FuelTypeSelect from "../components/fuelTypeSelect/FuelTypeSelect";
import TransmissionsSelect from "../components/transmissionsSelect/TransmissionsSelect";
import BodyStyleSelect from "../components/bodyStyleSelect/BodyStyleSelect";
import VehicleConditionsSelect from "../components/vehicleConditions/VehicleConditionsSelect";
import { useAuth } from "../../../context/auth/AuthContext";
import { createVehicle } from "../../../Api/ServerAPI";
import toast from "react-hot-toast";

const NewVehicleForSale = () => {
  const [loading, setLoading] = useState(false);

  const {
    type,
    country,
    setCountry,
    city,
    setCity,
    year,
    make,
    setMake,
    model,
    setModel,
    mileage,
    setMileage,
    price,
    setPrice,
    bodyStyle,
    cleanTitle,
    setCleanTitle,
    condition,
    fuelType,
    transmission,
    description,
    setDescription,
    showCities,
    setShowCities,
    fileData,
    setFileData,
    setType,
    setYear,
    setBodyStyle,
    setCondition,
    setFuelType,
    setTransmission,
  } = useVehicles();

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    setCountry();
    setType("");
    setCountry("");
    setCity("");
    setYear("");
    setMake("");
    setModel("");
    setMileage("");
    setPrice("");
    setBodyStyle("");
    setCleanTitle(false);
    setCondition("");
    setFuelType("");
    setTransmission("");
    setDescription("");
    setShowCities(false);
    setFileData([]);
  }, []);

  const handlePostVehicle = async (e) => {
    e.preventDefault();

    const updatedFileData = fileData.map((file) => ({
      ...file,
      publish: true,
    }));

    const newVehicle = {
      seller: auth?.userInfo?._id,
      type: type,
      location: country + ", " + city,
      year: year,
      make: make,
      model: model,
      mileage: mileage,
      price: price,
      bodyStyle: bodyStyle,
      cleanTitle: cleanTitle,
      condition: condition,
      fuelType: fuelType,
      transmission: transmission,
      description: description,
      files: updatedFileData,
    };

    try {
      await createVehicle(newVehicle);
      toast.success("Vehicle created successfully");
      setCountry();
      setType("");
      setCountry("");
      setCity("");
      setYear("");
      setMake("");
      setModel("");
      setMileage("");
      setPrice("");
      setBodyStyle("");
      setCleanTitle(false);
      setCondition("");
      setFuelType("");
      setTransmission("");
      setDescription("");
      setShowCities(false);
      setFileData([]);
      navigate("/marketPlace");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SwipeableTemporaryDrawer />
      <Topbar />
      <div className="adminContainer" style={{ display: "flex" }}>
        <SidebarMarketPlace />
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
          <h2>Vehicle for sale</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "20px" }}>
              <NewVehicleCard
                image={"https://i.imgur.com/E7oOUP1.gif"}
                title={"Add Photos"}
                subTitle={"or drag and drop"}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <VehicleTypesSelect />
              <CountrySelect
                setCountry={setCountry}
                setShowCities={setShowCities}
              />
              {showCities && <CitySelect country={country} setCity={setCity} />}
              <YearsSelect />
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                type="text"
                margin="normal"
                placeholder="Make"
                label="make"
                id="make"
                name="make"
                autoComplete="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                type="text"
                margin="normal"
                placeholder="Model"
                label="model"
                id="model"
                name="model"
                autoComplete="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                type="text"
                margin="normal"
                placeholder="Mileage"
                label="mileage"
                id="mileage"
                name="mileage"
                autoComplete="mileage"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />
              <Divider />
              <strong>Price</strong>
              <Typography variant="body2" color="text.secondary">
                Enter the price for this vehicle and use Kelley
                <br /> Blue Book Private Party Value to see how it compares.
              </Typography>
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                type="text"
                margin="normal"
                placeholder="Price"
                label="price"
                id="price"
                name="price"
                autoComplete="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Divider />
              <strong>Vehicle appearance and features</strong>
              <Typography variant="body2" color="text.secondary">
                Add more about what your vehicle
                <br /> looks like and the features that it has.
              </Typography>
              <BodyStyleSelect />
              <Divider />
              <strong>Vehicle details</strong>
              <Typography variant="body2" color="text.secondary">
                Include more details to help connect
                <br /> interested buyers to your vehicle.
              </Typography>
              <strong>This vehicle has a clean title.</strong>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cleanTitle}
                    onChange={(e) => setCleanTitle(e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    This vehicle has no significant
                    <br /> damage or persistent problems.
                  </Typography>
                }
              />
              <VehicleConditionsSelect />
              <FuelTypeSelect />
              <TransmissionsSelect />
              <Divider />
              <strong>Description</strong>
              <Typography variant="body2" color="text.secondary">
                Tell buyers anything that you haven't <br /> had the chance to
                include yet about your vehicle.
              </Typography>
              <TextareaAutosize
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minRows={10}
                style={{ width: "320px", marginBottom: "5px" }}
                placeholder="Description"
              />
            </div>
          </div>
          <Box
            display="flex"
            sx={{ marginTop: "20px", gap: "20px" }}
            justifyContent="space-between"
          >
            <Button
              disabled={loading}
              variant="contained"
              style={{ backgroundColor: "red" }}
              onClick={() => {
                navigate("/marketPlace");
              }}
            >
              Discard
            </Button>
            <Button
              disabled={loading}
              variant="contained"
              onClick={handlePostVehicle}
            >
              Post
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default NewVehicleForSale;
