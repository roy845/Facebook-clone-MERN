import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatPrice } from "../../../../utils/helpers";
import { useNavigate } from "react-router";
import { useAuth } from "../../../../context/auth/AuthContext";
import { useModal } from "../../../../context/modals/ModalContext";
import DeleteItemModal from "../../modals/deleteItemModal/DeleteItemModal";
import DeleteVehicleModal from "../../modals/deleteVehicleModal/DeleteVehicleModal";

const cardContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const priceLocationContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

export default function VehicleCard({
  vehicle,
  fetchAgainVehicles,
  setFetchAgainVehicles,
}) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const {
    openDeleteVehicleModal,
    onOpenDeleteVehicleModal,
    onCloseDeleteVehicleModal,
  } = useModal();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        onClick={() => navigate(`/vehicle/${vehicle._id}`)}
        sx={{ height: 240, cursor: "pointer" }}
        image={vehicle.files[0].url}
        title={vehicle.type}
      />
      <CardContent style={cardContentStyle}>
        <Typography gutterBottom variant="h5" component="div">
          {vehicle.type}
        </Typography>
        <div style={priceLocationContainerStyle}>
          <Typography variant="body2" color="text.secondary">
            {vehicle.price === 0
              ? "FREE"
              : formatPrice(vehicle.price, "Shekel")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {vehicle.location}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {vehicle.year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {vehicle.make + " " + vehicle.model}
        </Typography>
      </CardContent>
      <CardActions>
        {auth?.userInfo?._id === vehicle.seller._id && (
          <>
            <Button
              style={{ color: "white", backgroundColor: "purple" }}
              onClick={() => navigate(`/vehicle/editVehicle/${vehicle._id}`)}
              size="small"
            >
              Edit
            </Button>
            <Button
              style={{ color: "white", backgroundColor: "red" }}
              size="small"
              onClick={onOpenDeleteVehicleModal}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
      {openDeleteVehicleModal && (
        <DeleteVehicleModal
          open={onOpenDeleteVehicleModal}
          setOpen={onCloseDeleteVehicleModal}
          fetchAgainVehicles={fetchAgainVehicles}
          setFetchAgainVehicles={setFetchAgainVehicles}
          vehicle={vehicle}
        />
      )}
    </Card>
  );
}
