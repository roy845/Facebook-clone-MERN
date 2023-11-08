import { Button } from "@mui/material";
import ModalUnstyled from "../../../../components/modal/Modal";
import { Box } from "@mui/system";
import { deleteVehicle } from "../../../../Api/ServerAPI";
import { deleteObject, ref } from "firebase/storage";
import storage from "../../../../config/firebase";
import toast from "react-hot-toast";
import { useAuth } from "../../../../context/auth/AuthContext";

const DeleteVehicleModal = ({
  open,
  setOpen,
  vehicle,
  fetchAgainVehicles,
  setFetchAgainVehicles,
}) => {
  const { auth } = useAuth();

  const handleRemoveFile = async (id) => {
    const fileToRemove = vehicle?.files?.find((file) => file.id === id);

    if (fileToRemove) {
      try {
        const storageRef = ref(
          storage,
          `${auth?.userInfo?.username}/files/${fileToRemove.id}`
        );
        await deleteObject(storageRef);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVehicle(vehicle?._id);
      for (const file of vehicle?.files) {
        await handleRemoveFile(file?.id);
      }
      toast.success("Vehicle deleted successfully");
      setFetchAgainVehicles(!fetchAgainVehicles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalUnstyled open={open} onClose={setOpen} title="Delete vehicle">
      <h2>
        Are you sure you want to delete {vehicle?.make + " " + vehicle?.model} ?
      </h2>
      <Box
        display="flex"
        sx={{ marginTop: "20px" }}
        justifyContent="space-between"
      >
        <Button
          style={{ color: "white", backgroundColor: "purple" }}
          onClick={setOpen}
        >
          Discard
        </Button>
        <Button
          style={{ color: "white", backgroundColor: "red" }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    </ModalUnstyled>
  );
};

export default DeleteVehicleModal;
