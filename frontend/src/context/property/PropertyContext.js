import { createContext, useContext, useState } from "react";

export const PropertyContext = createContext({});

export const PropertyContextProvider = ({ children }) => {
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [dateAvailable, setDateAvailable] = useState();
  const [washingMachine, setWashingMachine] = useState("");
  const [parkingType, setParkingType] = useState("");
  const [airConditioning, setAirConditioning] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [catFriendly, setCatFriendly] = useState(false);
  const [dogFriendly, setDogFriendly] = useState(false);
  const [fileData, setFileData] = useState([]);

  return (
    <PropertyContext.Provider
      value={{
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
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

const useProperty = () => useContext(PropertyContext);

export { useProperty };
