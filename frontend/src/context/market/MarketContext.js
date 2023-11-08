import { createContext, useContext, useState } from "react";

export const MarketContext = createContext({});

export const MarketContextProvider = ({ children }) => {
  const [tabValue, setTabValue] = useState(0);
  const [searchItemsQuery, setSearchItemsQuery] = useState("");
  const [selectedSortItemsByValue, setSelectedSortItemsByValue] = useState("");
  const [selectedItemsByCondition, setSelectedItemsByCondition] = useState("");
  const [selectedItemsByCategory, setSelectedItemsByCategory] = useState("");
  const [minItemsPrice, setMinItemsPrice] = useState("");
  const [maxItemsPrice, setMaxItemsPrice] = useState("");
  const [searchVehiclesQuery, setSearchVehiclesQuery] = useState("");

  const [selectedSortVehiclesByValue, setSelectedSortVehiclesByValue] =
    useState("");
  const [selectedVehiclesByType, setSelectedVehiclesByType] = useState("");
  const [selectedVehiclesByBodyStyle, setSelectedVehiclesByBodyStyle] =
    useState("");
  const [selectedVehiclesByCondition, setSelectedVehiclesByCondition] =
    useState("");
  const [selectedVehiclesByFuelType, setSelectedVehiclesByFuelType] =
    useState("");
  const [selectedVehiclesByTransmission, setSelectedVehiclesByTransmission] =
    useState("");
  const [minVehiclesPrice, setMinVehiclesPrice] = useState("");
  const [maxVehiclesPrice, setMaxVehiclesPrice] = useState("");

  const [searchPropertyQuery, setSearchPropertyQuery] = useState("");
  const [selectedSortPropertyByValue, setSelectedSortPropertyByValue] =
    useState("");
  const [selectedPropertyByType, setSelectedPropertyByType] = useState("");
  const [selectedPropertyByBedrooms, setSelectedPropertyByBedrooms] =
    useState("");
  const [selectedPropertyByBathrooms, setSelectedPropertyByBathrooms] =
    useState("");
  const [
    selectedPropertyByWashingMachine,
    setSelectedPropertyByWashingMachine,
  ] = useState("");
  const [selectedPropertyParkingType, setSelectedPropertyParkingType] =
    useState("");
  const [
    selectedPropertyByAirconditioning,
    setSelectedPropertyByAirconditioning,
  ] = useState("");
  const [selectedPropertyByHeatingType, setSelectedPropertyByHeatingType] =
    useState("");
  const [selectedPropertyByCatFriendly, setSelectedPropertyByCatFriendly] =
    useState("");
  const [selectedPropertyByDogFriendly, setSelectedPropertyByDogFriendly] =
    useState("");

  const [squareFeetMin, setSquareFeetMin] = useState("");
  const [squareFeetMax, setSquareFeetMax] = useState("");
  const [minPropertyPrice, setMinPropertyPrice] = useState("");
  const [maxPropertyPrice, setMaxPropertyPrice] = useState("");

  return (
    <MarketContext.Provider
      value={{
        tabValue,
        setTabValue,
        searchItemsQuery,
        setSearchItemsQuery,
        selectedSortItemsByValue,
        setSelectedSortItemsByValue,
        selectedItemsByCondition,
        setSelectedItemsByCondition,
        selectedItemsByCategory,
        setSelectedItemsByCategory,
        minItemsPrice,
        setMinItemsPrice,
        maxItemsPrice,
        setMaxItemsPrice,
        searchVehiclesQuery,
        setSearchVehiclesQuery,
        selectedSortVehiclesByValue,
        setSelectedSortVehiclesByValue,
        selectedVehiclesByType,
        setSelectedVehiclesByType,
        selectedVehiclesByBodyStyle,
        setSelectedVehiclesByBodyStyle,
        selectedVehiclesByCondition,
        setSelectedVehiclesByCondition,
        selectedVehiclesByFuelType,
        setSelectedVehiclesByFuelType,
        selectedVehiclesByTransmission,
        setSelectedVehiclesByTransmission,
        minVehiclesPrice,
        setMinVehiclesPrice,
        maxVehiclesPrice,
        setMaxVehiclesPrice,

        searchPropertyQuery,
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
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

const useMarket = () => useContext(MarketContext);

export { useMarket };
