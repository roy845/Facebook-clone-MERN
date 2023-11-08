import { createContext, useContext, useState } from "react";

export const VehiclesContext = createContext({});

export const VehiclesContextProvider = ({ children }) => {
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [bodyStyle, setBodyStyle] = useState("");
  const [cleanTitle, setCleanTitle] = useState(false);
  const [condition, setCondition] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [description, setDescription] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [fileData, setFileData] = useState([]); // Use an array to store file data

  return (
    <VehiclesContext.Provider
      value={{
        type,
        setType,
        country,
        setCountry,
        city,
        setCity,
        year,
        setYear,
        make,
        setMake,
        model,
        setModel,
        mileage,
        setMileage,
        price,
        setPrice,
        bodyStyle,
        setBodyStyle,
        cleanTitle,
        setCleanTitle,
        condition,
        setCondition,
        fuelType,
        setFuelType,
        transmission,
        setTransmission,
        description,
        setDescription,
        showCities,
        setShowCities,
        fileData,
        setFileData,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};

const useVehicles = () => useContext(VehiclesContext);

export { useVehicles };
