import { useEffect, useState } from "react";
import { useMarket } from "../../../../context/market/MarketContext";
import { debounce } from "lodash";
import { useModal } from "../../../../context/modals/ModalContext";
import { searchVehicles } from "../../../../Api/ServerAPI";
import VehiclesList from "../vehiclesList/VehiclesList";

const Vehicles = () => {
  const [fetchAgainVehicles, setFetchAgainVehicles] = useState(false);
  const [searchVehiclesResults, setSearchVehiclesResults] = useState([]);

  const { handleCloseBackDrop, handleOpenBackDrop } = useModal();

  const {
    searchVehiclesQuery,
    selectedSortVehiclesByValue,
    selectedVehiclesByType,
    selectedVehiclesByBodyStyle,
    selectedVehiclesByCondition,
    selectedVehiclesByFuelType,
    selectedVehiclesByTransmission,
    minVehiclesPrice,
    maxVehiclesPrice,
  } = useMarket();

  const debouncedVehiclesSearch = debounce(async (query) => {
    try {
      handleOpenBackDrop(true);

      const { data } = await searchVehicles(
        query,
        selectedSortVehiclesByValue,
        selectedVehiclesByType,
        selectedVehiclesByBodyStyle,
        selectedVehiclesByCondition,
        selectedVehiclesByFuelType,
        selectedVehiclesByTransmission,
        minVehiclesPrice,
        maxVehiclesPrice
      );
      setSearchVehiclesResults(data);
      handleCloseBackDrop(false);
    } catch (error) {
      console.error("Error searching vehicles:", error);
      handleCloseBackDrop(false);
    }
  }, 500);

  useEffect(() => {
    debouncedVehiclesSearch(searchVehiclesQuery);
  }, [
    searchVehiclesQuery,
    selectedSortVehiclesByValue,
    selectedVehiclesByType,
    selectedVehiclesByBodyStyle,
    selectedVehiclesByCondition,
    selectedVehiclesByFuelType,
    selectedVehiclesByTransmission,
    minVehiclesPrice,
    maxVehiclesPrice,
    fetchAgainVehicles,
  ]);
  return (
    <VehiclesList
      fetchAgainVehicles={fetchAgainVehicles}
      setFetchAgainVehicles={setFetchAgainVehicles}
      searchVehiclesResults={searchVehiclesResults}
    />
  );
};

export default Vehicles;
