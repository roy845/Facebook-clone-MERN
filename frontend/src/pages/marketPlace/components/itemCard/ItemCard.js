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

export default function ItemCard({ item, fetchAgain, setFetchAgain }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { openDeleteItemModal, onOpenDeleteItemModal, onCloseDeleteItemModal } =
    useModal();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        onClick={() => navigate(`/item/${item._id}`)}
        sx={{ height: 240, cursor: "pointer" }}
        image={item.files[0].url}
        title={item.title}
      />
      <CardContent style={cardContentStyle}>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <div style={priceLocationContainerStyle}>
          <Typography variant="body2" color="text.secondary">
            {item.price === 0 ? "FREE" : formatPrice(item.price, "Shekel")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.location}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.availability === "List as single item"
            ? "Sold individually"
            : "Sold in wholesale"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.productTags}
        </Typography>
      </CardContent>
      <CardActions>
        {auth?.userInfo?._id === item.seller._id && (
          <>
            <Button
              style={{ color: "white", backgroundColor: "purple" }}
              onClick={() => navigate(`/item/editItem/${item._id}`)}
              size="small"
            >
              Edit
            </Button>
            <Button
              style={{ color: "white", backgroundColor: "red" }}
              size="small"
              onClick={onOpenDeleteItemModal}
            >
              Delete
            </Button>
          </>
        )}
      </CardActions>
      {openDeleteItemModal && (
        <DeleteItemModal
          open={openDeleteItemModal}
          setOpen={onCloseDeleteItemModal}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          item={item}
        />
      )}
    </Card>
  );
}
