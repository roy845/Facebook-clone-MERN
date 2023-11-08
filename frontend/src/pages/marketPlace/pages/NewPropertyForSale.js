import {
  Button,
  Divider,
  Switch,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import SwipeableTemporaryDrawer from "../../../components/SwipeableDrawer/SwipeableDrawer";
import Topbar from "../../../components/topbar/Topbar";
import NewPropertyCard from "../components/newPropertyCard/NewPropertyCard";
import PropertyTypesSelect from "../components/propertyTypesSelect/PropertyTypesSelect";
import SidebarMarketPlace from "../components/sideBar/SidebarMarketPlace";
import { useProperty } from "../../../context/property/PropertyContext";
import { DatePicker } from "@mui/x-date-pickers";
import WashingMachineSelect from "../components/washingMachineSelect/WashingMachineSelect";
import ParkingTypeSelect from "../components/parkingTypeSelect/ParkingTypeSelect";
import AirConditioningSelect from "../components/airConditioningSelect/AirConditioningSelect";
import HeatingTypeSelect from "../components/heatingTypeSelect/HeatingTypeSelect";
import { Box } from "@mui/system";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/auth/AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { createProperty } from "../../../Api/ServerAPI";

const NewPropertyForSale = () => {
  const [loading, setLoading] = useState(false);

  const {
    type,
    setType,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    price,
    setPrice,
    address,
    setAddress,
    description,
    setDescription,
    squareFeet,
    setSquareFeet,
    dateAvailable,
    setDateAvailable,
    washingMachine,
    setWashingMachine,
    parkingType,
    setParkingType,
    airConditioning,
    setAirConditioning,
    heatingType,
    setHeatingType,
    catFriendly,
    setCatFriendly,
    dogFriendly,
    setDogFriendly,
    fileData,
    setFileData,
  } = useProperty();

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    setType("");
    setBedrooms("");
    setBathrooms("");
    setPrice("");
    setAddress("");
    setDescription("");
    setSquareFeet("");
    setDateAvailable(null);
    setWashingMachine("");
    setParkingType("");
    setAirConditioning("");
    setHeatingType("");
    setCatFriendly(false);
    setDogFriendly(false);
    setFileData([]);
  }, []);

  const handlePostProperty = async (e) => {
    e.preventDefault();

    const updatedFileData = fileData.map((file) => ({
      ...file,
      publish: true,
    }));

    const newProperty = {
      seller: auth?.userInfo?._id,
      type: type,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      pricePerMonth: price,
      address: address,
      description: description,
      propertySquareFeet: squareFeet,
      dateAvailable: dateAvailable,
      washingMachine: washingMachine,
      parkingType: parkingType,
      airConditioning: airConditioning,
      heatingType: heatingType,
      catFriendly: catFriendly,
      dogFriendly: dogFriendly,
      files: updatedFileData,
    };

    try {
      await createProperty(newProperty);
      toast.success("Property created successfully");
      setType("");
      setBedrooms("");
      setBathrooms("");
      setPrice("");
      setAddress("");
      setDescription("");
      setSquareFeet("");
      setDateAvailable();
      setWashingMachine("");
      setParkingType("");
      setAirConditioning("");
      setHeatingType("");
      setCatFriendly(false);
      setDogFriendly(false);
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
          <h2>Property for sale/rent</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "20px" }}>
              <NewPropertyCard
                image={"https://i.imgur.com/E7oOUP1.gif"}
                title={"Add Photos"}
                subTitle={"or drag and drop"}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <PropertyTypesSelect />
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                type="text"
                margin="normal"
                placeholder="Number of bedrooms"
                label="bedrooms"
                id="bedrooms"
                name="bedrooms"
                autoComplete="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                type="text"
                margin="normal"
                placeholder="Number of bathrooms"
                label="bathrooms"
                id="bathrooms"
                name="bathrooms"
                autoComplete="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                type="text"
                margin="normal"
                placeholder="Price per month"
                label="price per month"
                id="price per month"
                name="price per month"
                autoComplete="price per month"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                type="text"
                margin="normal"
                placeholder="Address property for rent"
                label="address property for rent"
                id="address property for rent"
                name="address property for rent"
                autoComplete="address property for rent"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextareaAutosize
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minRows={10}
                style={{ width: "320px", marginBottom: "5px" }}
                placeholder="Property for rent description"
              />
              <Typography variant="body2" color="text.secondary">
                Include details such as utilities, amenities, any deposits
                <br />
                needed and when it's available.
              </Typography>
              <Divider />
              <Typography
                variant="body2"
                color="text.secondary"
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>Advanced details</strong>
                Optional
              </Typography>
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                type="text"
                margin="normal"
                placeholder="Property square feet"
                label="Property square feet"
                id="Property square feet"
                name="Property square feet"
                autoComplete="Property square feet"
                value={squareFeet}
                onChange={(e) => setSquareFeet(e.target.value)}
              />

              <DatePicker
                sx={{ marginTop: "10px" }}
                value={dateAvailable}
                required
                onChange={(date) => setDateAvailable(date)}
              />
              <WashingMachineSelect />
              <ParkingTypeSelect />
              <AirConditioningSelect />
              <HeatingTypeSelect />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Cat Friendly:
                </Typography>
                <Switch
                  checked={catFriendly}
                  onChange={(e) => setCatFriendly(e.target.checked)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Dog Friendly:
                </Typography>
                <Switch
                  checked={dogFriendly}
                  onChange={(e) => setDogFriendly(e.target.checked)}
                />
              </div>
            </div>
          </div>
          <Box
            display="flex"
            sx={{ marginTop: "20px", gap: "20px" }}
            justifyContent="space-between"
          >
            <Button
              //   disabled={loading}
              variant="contained"
              style={{ backgroundColor: "red" }}
              onClick={() => {
                navigate("/marketPlace");
              }}
            >
              Discard
            </Button>
            <Button
              //   disabled={loading}
              variant="contained"
              onClick={handlePostProperty}
            >
              Post
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default NewPropertyForSale;
