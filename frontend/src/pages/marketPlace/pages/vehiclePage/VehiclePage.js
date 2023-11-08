import "./vehiclePage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVehicle } from "../../../../Api/ServerAPI";
import SidebarMarketPlace from "../../components/sideBar/SidebarMarketPlace";
import Topbar from "../../../../components/topbar/Topbar";
import SwipeableTemporaryDrawer from "../../../../components/SwipeableDrawer/SwipeableDrawer";
import { useModal } from "../../../../context/modals/ModalContext";
import SimpleBackdrop from "../../../../components/backDrop/BackDrop";
import ItemsImageCarousel from "../../components/ItemsImageCarousel/ItemsImageCarousel";
import VehicleDetailsSidebar from "../../components/VehicleDetailsSidebar/VehicleDetailsSidebar";

const VehiclePage = () => {
  const [vehicle, setVehicle] = useState({});

  const {
    openBackDropVehicle,
    handleCloseBackDropVehicle,
    handleOpenBackDropVehicle,
  } = useModal();
  const { vehicleId } = useParams();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        handleOpenBackDropVehicle(true);
        const { data } = await getVehicle(vehicleId);
        handleCloseBackDropVehicle(false);
        setVehicle(data);
      } catch (error) {
        console.log(error);
        handleCloseBackDropVehicle(false);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  return (
    <div>
      <SwipeableTemporaryDrawer />
      <Topbar />
      <div className="adminContainer" style={{ display: "flex" }}>
        <SidebarMarketPlace />
        {openBackDropVehicle ? (
          <SimpleBackdrop
            open={openBackDropVehicle}
            setOpen={handleCloseBackDropVehicle}
          />
        ) : (
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
            <ItemsImageCarousel
              slides={vehicle?.files?.map((file) => file.url)}
            />
          </div>
        )}
        <VehicleDetailsSidebar vehicle={vehicle} />
      </div>
    </div>
  );
};

export default VehiclePage;
