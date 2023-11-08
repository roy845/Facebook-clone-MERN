import "./itemPage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getItem } from "../../../../Api/ServerAPI";
import SidebarMarketPlace from "../../components/sideBar/SidebarMarketPlace";
import Topbar from "../../../../components/topbar/Topbar";
import SwipeableTemporaryDrawer from "../../../../components/SwipeableDrawer/SwipeableDrawer";
import { useModal } from "../../../../context/modals/ModalContext";
import SimpleBackdrop from "../../../../components/backDrop/BackDrop";
import ItemsImageCarousel from "../../components/ItemsImageCarousel/ItemsImageCarousel";
import ItemDetailsSidebar from "../../components/ItemDetailsSidebar/ItemDetailsSidebar";

const ItemPage = () => {
  const [item, setItem] = useState({});

  const { openBackDrop, handleCloseBackDrop, handleOpenBackDrop } = useModal();
  const { itemId } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        handleOpenBackDrop(true);
        const { data } = await getItem(itemId);
        handleCloseBackDrop(false);
        setItem(data);
      } catch (error) {
        console.log(error);
        handleCloseBackDrop(false);
      }
    };

    fetchItem();
  }, []);

  console.log(item);

  return (
    <div>
      <SwipeableTemporaryDrawer />
      <Topbar />
      <div className="adminContainer" style={{ display: "flex" }}>
        <SidebarMarketPlace />
        {openBackDrop ? (
          <SimpleBackdrop open={openBackDrop} setOpen={handleCloseBackDrop} />
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
            <ItemsImageCarousel slides={item?.files?.map((file) => file.url)} />
          </div>
        )}
        <ItemDetailsSidebar item={item} />
      </div>
    </div>
  );
};

export default ItemPage;
