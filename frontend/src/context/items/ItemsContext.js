import { createContext, useContext, useState } from "react";

export const ItemsContext = createContext({});

export const ItemsContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [productTags, setProductTags] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [fileData, setFileData] = useState([]); // Use an array to store file data

  return (
    <ItemsContext.Provider
      value={{
        title,
        price,
        setTitle,
        setPrice,
        selectedCondition,
        setSelectedCondition,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
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
        selectedAvailability,
        setSelectedAvailability,
        fileData,
        setFileData,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

const useItems = () => useContext(ItemsContext);

export { useItems };
