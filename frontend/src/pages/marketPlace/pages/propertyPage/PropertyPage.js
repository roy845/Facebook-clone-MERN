import "./propertyPage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProperty } from "../../../../Api/ServerAPI";
import SidebarMarketPlace from "../../components/sideBar/SidebarMarketPlace";
import Topbar from "../../../../components/topbar/Topbar";
import SwipeableTemporaryDrawer from "../../../../components/SwipeableDrawer/SwipeableDrawer";
import { useModal } from "../../../../context/modals/ModalContext";
import SimpleBackdrop from "../../../../components/backDrop/BackDrop";
import ItemsImageCarousel from "../../components/ItemsImageCarousel/ItemsImageCarousel";
import VehicleDetailsSidebar from "../../components/VehicleDetailsSidebar/VehicleDetailsSidebar";
import PropertyDetailsSidebar from "../../components/propertyDetailsSidebar/PropertiesDetailsSidebar";

const PropertyPage = () => {
  const [property, setProperty] = useState({});

  const {
    openBackDropProperty,
    handleCloseBackDropProperty,
    handleOpenBackDropProperty,
  } = useModal();
  const { propertyId } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        handleOpenBackDropProperty(true);
        const { data } = await getProperty(propertyId);
        handleCloseBackDropProperty(false);
        setProperty(data);
      } catch (error) {
        console.log(error);
        handleCloseBackDropProperty(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  return (
    <div>
      <SwipeableTemporaryDrawer />
      <Topbar />
      <div className="adminContainer" style={{ display: "flex" }}>
        <SidebarMarketPlace />
        {openBackDropProperty ? (
          <SimpleBackdrop
            open={openBackDropProperty}
            setOpen={handleCloseBackDropProperty}
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
              slides={property?.files?.map((file) => file.url)}
            />
          </div>
        )}
        <PropertyDetailsSidebar property={property} />
      </div>
    </div>
  );
};

export default PropertyPage;
