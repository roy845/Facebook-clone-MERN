import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import EntertainmentIcon from "@mui/icons-material/EmojiObjects";
import ClothingIcon from "@mui/icons-material/AccessTime";
import FamilyIcon from "@mui/icons-material/FamilyRestroom";
import ElectronicsIcon from "@mui/icons-material/Phone";
import HobbiesIcon from "@mui/icons-material/DirectionsBike";
import ClassifiedsIcon from "@mui/icons-material/MiscellaneousServices";
import VehiclesIcon from "@mui/icons-material/DriveEta";
import { useItems } from "../../../../context/items/ItemsContext";
import { useNavigate } from "react-router";

const categories = [
  {
    label: "Home & Garden",
    icon: <HomeIcon />,
    subcategories: ["Tools", "Furniture", "Household", "Garden", "Appliances"],
  },
  {
    label: "Entertainment",
    icon: <EntertainmentIcon />,
    subcategories: ["Video Games", "Books, Films & Music"],
  },
  {
    label: "Clothing & Accessories",
    icon: <ClothingIcon />,
    subcategories: [
      "Bags & Luggage",
      "Women's Clothing & Shoes",
      "Men's Clothing & Shoes",
      "Jewellery & Accessories",
    ],
  },
  {
    label: "Family",
    icon: <FamilyIcon />,
    subcategories: [
      "Health and Beauty",
      "Pet Supplies",
      "Baby & Children",
      "Toys and Games",
    ],
  },
  {
    label: "Electronics",
    icon: <ElectronicsIcon />,
    subcategories: ["Electronics and Computers", "Mobile Phones"],
  },
  {
    label: "Hobbies",
    icon: <HobbiesIcon />,
    subcategories: [
      "Bicycles",
      "Arts & Crafts",
      "Sport & Outdoors",
      "Car Parts",
      "Musical Instruments",
      "Antiques & Collectibles",
    ],
  },
  {
    label: "Classifieds",
    icon: <ClassifiedsIcon />,
    subcategories: ["Garage Sale", "Miscellaneous"],
  },
  {
    label: "Vehicles",
    icon: <VehiclesIcon />,
    subcategories: [],
  },
];

const CategorySelect = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
  } = useItems();
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    if (event.target.value === "Vehicles") {
      navigate("/newVehicleForSale");
    }

    setSelectedCategory(event.target.value);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  return (
    <div>
      <TextField
        style={{ width: "320px", marginBottom: "10px", marginRight: "10px" }}
        variant="outlined"
        select
        label="Category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <MenuItem
            key={category.label}
            value={category.label}
            icon={category.icon}
          >
            {category.label}
          </MenuItem>
        ))}
      </TextField>

      {selectedCategory && (
        <TextField
          style={{ width: "320px" }}
          variant="outlined"
          select
          label="Subcategory"
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
        >
          <MenuItem value="" disabled>
            Select Subcategory
          </MenuItem>
          {categories
            .find((category) => category.label === selectedCategory)
            .subcategories.map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                {subcategory}
              </MenuItem>
            ))}
        </TextField>
      )}
    </div>
  );
};

export default CategorySelect;
