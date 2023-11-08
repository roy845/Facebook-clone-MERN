import { useEffect, useState } from "react";
import { useModal } from "../../../../context/modals/ModalContext";
import { useMarket } from "../../../../context/market/MarketContext";
import { debounce } from "lodash";
import { searchProperties } from "../../../../Api/ServerAPI";
import PropertiesList from "../propertiesList/PropertiesList";

const Properties = () => {
  const [fetchAgainProperties, setFetchAgainProperties] = useState(false);

  const [searchPropertiesResults, setSearchPropertiesResults] = useState([]);

  const { handleCloseBackDrop, handleOpenBackDrop } = useModal();

  const {
    searchPropertyQuery,

    selectedSortPropertyByValue,
    selectedPropertyByType,
    selectedPropertyByBedrooms,
    selectedPropertyByBathrooms,
    selectedPropertyByWashingMachine,
    selectedPropertyParkingType,
    selectedPropertyByAirconditioning,
    selectedPropertyByHeatingType,
    selectedPropertyByCatFriendly,
    selectedPropertyByDogFriendly,
    squareFeetMin,
    squareFeetMax,
    minPropertyPrice,
    maxPropertyPrice,
  } = useMarket();

  const debouncedPropertiesSearch = debounce(async (query) => {
    try {
      handleOpenBackDrop(true);

      const { data } = await searchProperties(
        query,
        selectedSortPropertyByValue,
        selectedPropertyByType,
        selectedPropertyByBedrooms,
        selectedPropertyByBathrooms,
        selectedPropertyByWashingMachine,
        selectedPropertyParkingType,
        selectedPropertyByAirconditioning,
        selectedPropertyByHeatingType,
        selectedPropertyByCatFriendly,
        selectedPropertyByDogFriendly,
        squareFeetMin,
        squareFeetMax,
        minPropertyPrice,
        maxPropertyPrice
      );
      setSearchPropertiesResults(data);
      handleCloseBackDrop(false);
    } catch (error) {
      console.error("Error searching properties:", error);
      handleCloseBackDrop(false);
    }
  }, 500);

  useEffect(() => {
    debouncedPropertiesSearch(searchPropertyQuery);
  }, [
    searchPropertyQuery,
    selectedSortPropertyByValue,
    selectedPropertyByType,
    selectedPropertyByBedrooms,
    selectedPropertyByBathrooms,
    selectedPropertyByWashingMachine,
    selectedPropertyParkingType,
    selectedPropertyByAirconditioning,
    selectedPropertyByHeatingType,
    selectedPropertyByCatFriendly,
    selectedPropertyByDogFriendly,
    squareFeetMin,
    squareFeetMax,
    minPropertyPrice,
    maxPropertyPrice,
    fetchAgainProperties,
  ]);

  return (
    <PropertiesList
      searchPropertiesResults={searchPropertiesResults}
      fetchAgainProperties={fetchAgainProperties}
      setFetchAgainProperties={setFetchAgainProperties}
    />
  );
};

export default Properties;
