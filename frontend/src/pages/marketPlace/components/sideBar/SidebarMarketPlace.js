import "./SidebarMarketPlace.css";
import { useLocation, useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InboxIcon from "@mui/icons-material/Inbox";
import SellIcon from "@mui/icons-material/Sell";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../../../../context/modals/ModalContext";
import SettingsIcon from "@mui/icons-material/Settings";
import NewListingModal from "../../modals/newListingModal/NewListingModal";
import { useMarket } from "../../../../context/market/MarketContext";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ItemsFilters from "../itemsFilters/ItemsFilters";
import { Button } from "@mui/material";
import VehiclesFilters from "../vehiclesFilters/VehiclesFilters";
import PropertiesFilters from "../propertiesFilters/PropertiesFilters";
import { Box, Text } from "@chakra-ui/react";

export default function SidebarMarketPlace() {
  const navigate = useNavigate();
  const {
    tabValue,
    searchItemsQuery,
    setSearchItemsQuery,
    searchVehiclesQuery,
    setSearchVehiclesQuery,
    searchPropertyQuery,
    setSearchPropertyQuery,
  } = useMarket();
  const { onOpenNewListingModal, onCloseNewListingModal, openNewListingModal } =
    useModal();
  const { pathname } = useLocation();

  const btnTxt = "Create new listing";

  const sideBarItems = [
    {
      name: "Browse all",
      icon: <StorefrontIcon className="sidebarIcon" />,
      onClick: () => navigate("/marketPlace"),
    },
    {
      name: "Notifications",
      icon: <NotificationsIcon className="sidebarIcon" />,
      onClick: () => {},
    },
    {
      name: "Inbox",
      icon: <InboxIcon className="sidebarIcon" />,
      onClick: () => {},
    },
    {
      name: "Buying",
      icon: <ShoppingBagIcon className="sidebarIcon" />,
      onClick: () => {},
    },
    {
      name: "Selling",
      icon: <SellIcon className="sidebarIcon" />,
      onClick: () => {},
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              fontWeight="bold"
              fontSize={28}
              style={{ marginBottom: "10px" }}
            >
              Market place
            </Text>
            <SettingsIcon style={{ cursor: "pointer" }} />
          </div>
          {pathname === "/marketPlace" && tabValue === 0 && (
            <TextField
              variant="outlined"
              value={searchItemsQuery}
              onChange={(e) => setSearchItemsQuery(e.target.value)}
              className="customTextField"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search items"
            />
          )}

          {pathname === "/marketPlace" && tabValue === 1 && (
            <TextField
              variant="outlined"
              value={searchVehiclesQuery}
              onChange={(e) => setSearchVehiclesQuery(e.target.value)}
              className="customTextField"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search vehicles"
            />
          )}

          {pathname === "/marketPlace" && tabValue === 2 && (
            <TextField
              variant="outlined"
              value={searchPropertyQuery}
              onChange={(e) => setSearchPropertyQuery(e.target.value)}
              className="customTextField"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search properties"
            />
          )}

          {sideBarItems.map((item, index) => (
            <Box
              onClick={item.onClick}
              cursor="pointer"
              ser
              px={3}
              py={2}
              borderRadius="lg"
              key={index}
              _hover={{
                backgroundColor: "#1775ee",
                color: "white",
                cursor: "pointer",
              }}
            >
              {item.icon}
              {item.name}
            </Box>
          ))}
        </ul>
        <Button startIcon={<AddIcon />} onClick={onOpenNewListingModal}>
          {btnTxt}
        </Button>
        <br />
        <br />
        {pathname === "/marketPlace" && tabValue === 0 && <ItemsFilters />}
        {pathname === "/marketPlace" && tabValue === 1 && <VehiclesFilters />}
        {pathname === "/marketPlace" && tabValue === 2 && <PropertiesFilters />}
      </div>
      {openNewListingModal && (
        <NewListingModal
          open={openNewListingModal}
          setOpen={onCloseNewListingModal}
        />
      )}
    </div>
  );
}
