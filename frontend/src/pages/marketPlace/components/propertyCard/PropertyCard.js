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
import DeletePropertyModal from "../../modals/DeletePropertyModal/DeletePropertyModal";

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

export default function PropertyCard({
  property,
  fetchAgainProperties,
  setFetchAgainProperties,
}) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const {
    openDeletePropertyModal,
    onOpenDeletePropertyModal,
    onCloseDeletePropertyModal,
  } = useModal();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        onClick={() => navigate(`/property/${property._id}`)}
        sx={{ height: 240, cursor: "pointer" }}
        image={property?.files?.[0]?.url}
        title={property?.type}
      />
      <CardContent style={cardContentStyle}>
        <Typography gutterBottom variant="h5" component="div">
          {property?.type}
        </Typography>
        <div style={priceLocationContainerStyle}>
          <Typography variant="body2" color="text.secondary">
            {property?.pricePerMonth === 0
              ? "FREE"
              : formatPrice(property?.pricePerMonth, "Shekel")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property?.address}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {property?.description}
        </Typography>
      </CardContent>
      <CardActions>
        {auth?.userInfo?._id === property?.seller?._id && (
          <>
            <Button
              style={{ color: "white", backgroundColor: "purple" }}
              onClick={() =>
                navigate(`/property/editProperty/${property?._id}`)
              }
              size="small"
            >
              Edit
            </Button>
            <Button
              style={{ color: "white", backgroundColor: "red" }}
              size="small"
              onClick={onOpenDeletePropertyModal}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
      {openDeletePropertyModal && (
        <DeletePropertyModal
          open={openDeletePropertyModal}
          setOpen={onCloseDeletePropertyModal}
          fetchAgainProperties={fetchAgainProperties}
          setFetchAgainProperties={setFetchAgainProperties}
          property={property}
        />
      )}
    </Card>
  );
}
