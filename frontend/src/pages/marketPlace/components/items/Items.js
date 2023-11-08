import { useEffect, useState } from "react";
import { useMarket } from "../../../../context/market/MarketContext";
import { debounce } from "lodash";
import { searchItems } from "../../../../Api/ServerAPI";
import { useModal } from "../../../../context/modals/ModalContext";
import ItemsList from "../ItemsList/ItemsList";

const Items = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [searchItemsResults, setSearchItemsResults] = useState([]);

  const { handleCloseBackDrop, handleOpenBackDrop } = useModal();

  const {
    searchItemsQuery,
    selectedSortItemsByValue,
    selectedItemsByCondition,
    selectedItemsByCategory,
    minItemsPrice,
    maxItemsPrice,
  } = useMarket();

  const debouncedItemsSearch = debounce(async (query) => {
    try {
      handleOpenBackDrop(true);
      let selectedItemsByCategoryModified = selectedItemsByCategory;

      if (selectedItemsByCategory.includes("&")) {
        selectedItemsByCategoryModified = selectedItemsByCategory.replace(
          /&/g,
          "%26"
        );
      }
      const { data } = await searchItems(
        query,
        selectedSortItemsByValue,
        selectedItemsByCondition,
        selectedItemsByCategoryModified,
        minItemsPrice,
        maxItemsPrice
      );
      setSearchItemsResults(data);

      handleCloseBackDrop(false);
    } catch (error) {
      console.error("Error searching items:", error);
      handleCloseBackDrop(false);
    }
  }, 500);

  useEffect(() => {
    debouncedItemsSearch(searchItemsQuery);
  }, [
    searchItemsQuery,
    selectedSortItemsByValue,
    selectedItemsByCondition,
    selectedItemsByCategory,
    minItemsPrice,
    maxItemsPrice,
    fetchAgain,
  ]);

  return (
    <ItemsList
      fetchAgain={fetchAgain}
      setFetchAgain={setFetchAgain}
      searchItemsResults={searchItemsResults}
    />
  );
};

export default Items;
