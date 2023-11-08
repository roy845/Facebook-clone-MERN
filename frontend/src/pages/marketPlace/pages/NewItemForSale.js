import React, { useEffect, useState } from "react";
import SwipeableTemporaryDrawer from "../../../components/SwipeableDrawer/SwipeableDrawer";
import Topbar from "../../../components/topbar/Topbar";
import SidebarMarketPlace from "../components/sideBar/SidebarMarketPlace";
import NewItemCard from "../components/newItemCard/NewItemCard";
import { Button, TextField } from "@mui/material";
import CategorySelect from "../components/categoriesSelect/CategoriesSelect";
import ConditionsSelect from "../components/conditionsSelect/ConditionsSelect";
import MoreDetails from "../components/moreDetails/MoreDetails";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { useItems } from "../../../context/items/ItemsContext";
import { useAuth } from "../../../context/auth/AuthContext";
import toast from "react-hot-toast";
import { createItem } from "../../../Api/ServerAPI";

const NewItemForSale = () => {
  const {
    title,
    price,
    setTitle,
    setPrice,
    selectedSubcategory,
    selectedCondition,
    description,
    selectedAvailability,
    productTags,
    country,
    city,
    fileData,
    selectedCategory,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedCondition,
    setDescription,
    setSelectedAvailability,
    setCountry,
    setCity,
    setProductTags,
    setShowCities,
    setFileData,
  } = useItems();
  const [loading, setLoading] = useState();

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("");
    setPrice("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedCondition("");
    setDescription("");
    setSelectedAvailability("");
    setCountry("");
    setCity("");
    setProductTags("");
    setShowCities(false);
    setFileData([]);
  }, []);

  const handlePostItem = async (e) => {
    e.preventDefault();

    const updatedFileData = fileData.map((file) => ({
      ...file,
      publish: true,
    }));

    const newItem = {
      seller: auth?.userInfo?._id,
      title: title,
      price: price,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      condition: selectedCondition,
      description: description,
      availability: selectedAvailability,
      productTags: productTags,
      location: country + " ," + city,
      files: updatedFileData, // Use the array of file data
    };

    try {
      await createItem(newItem);
      toast.success("Item created successfully");
      setTitle("");
      setPrice("");
      setSelectedSubcategory("");
      setSelectedCondition("");
      setDescription("");
      setSelectedAvailability("");
      setCountry("");
      setCity("");
      setProductTags("");
      setShowCities(false);
      setFileData([]);
      navigate("/marketPlace");
    } catch (error) {
      toast.error(error);
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
          <h2>Item for sale</h2>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "20px" }}>
              <NewItemCard
                image={"https://i.imgur.com/E7oOUP1.gif"}
                title={"Add Photos"}
                subTitle={"or drag and drop"}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                margin="normal"
                placeholder="Title"
                label="title"
                id="title"
                name="title"
                autoComplete="title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                style={{ width: "320px" }}
                variant="outlined"
                type="number"
                margin="normal"
                placeholder="Price"
                label="price"
                id="price"
                name="price"
                autoComplete="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <CategorySelect />
              <ConditionsSelect />
              <MoreDetails />
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
              onClick={handlePostItem}
            >
              Post
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default NewItemForSale;
