import "./marketPlace.css";
import SwipeableTemporaryDrawer from "../../components/SwipeableDrawer/SwipeableDrawer";
import Topbar from "../../components/topbar/Topbar";
import SidebarMarketPlace from "./components/sideBar/SidebarMarketPlace";
import MarketPlaceTabs from "./components/marketPlaceTabs/MarketPlaceTabs";
import Items from "./components/items/Items";
import Vehicles from "./components/vehicles/Vehicles";
import Properties from "./components/properties/Properties";
import { Text } from "@chakra-ui/react";

const MarketPlace = () => {
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
            marginTop: "20px",
          }}
        >
          <Text
            display="flex"
            flexDirection="column"
            marginTop="20px"
            fontWeight="bold"
            fontSize={28}
            style={{ marginBottom: "10px" }}
          >
            Today's picks
          </Text>

          <MarketPlaceTabs
            items={<Items />}
            vehicles={<Vehicles />}
            properties={<Properties />}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
