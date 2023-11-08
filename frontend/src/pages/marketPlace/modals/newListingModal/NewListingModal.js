import "./newListingModal.css";
import React from "react";
import ModalUnstyled from "../../../../components/modal/Modal";
import NewListingCard from "../../components/newListingCard/NewListingCard";
import { useNavigate } from "react-router";

const NewListingModal = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <ModalUnstyled open={open} onClose={setOpen} title={"Choose listing type"}>
      <div className="card-container">
        <NewListingCard
          onClick={() => {
            navigate("/newItemForSale");
            setOpen();
          }}
          image={"https://i.imgur.com/WgPP69j.gif"}
          title={"Item for sale"}
          subTitle={"Create a single listing for one or more items to sell."}
        />
        <NewListingCard
          onClick={() => {
            navigate("/newVehicleForSale");
            setOpen();
          }}
          image={"https://i.imgur.com/XMYcMG8.gif"}
          title={"Vehicle for sale"}
          subTitle={"Sell a car, van or other type of vehicle."}
        />
        <NewListingCard
          onClick={() => {
            navigate("/newPropertyForSale");
            setOpen();
          }}
          image={"https://i.imgur.com/DdPnDvY.gif"}
          title={"Property for sale"}
          subTitle={"List a house or flat for sale or rent."}
        />
      </div>
    </ModalUnstyled>
  );
};

export default NewListingModal;
