import { Button } from "@mui/material";
import ModalUnstyled from "../../../../components/modal/Modal";
import { Box } from "@mui/system";
import { deleteItem } from "../../../../Api/ServerAPI";
import { deleteObject, ref } from "firebase/storage";
import storage from "../../../../config/firebase";
import toast from "react-hot-toast";
import { useAuth } from "../../../../context/auth/AuthContext";

const DeleteItemModal = ({
  open,
  setOpen,
  item,
  fetchAgain,
  setFetchAgain,
}) => {
  const { auth } = useAuth();

  const handleRemoveFile = async (id) => {
    const fileToRemove = item?.files?.find((file) => file.id === id);

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
      await deleteItem(item._id);
      for (const file of item?.files) {
        await handleRemoveFile(file?.id);
      }
      toast.success("Item deleted successfully");
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalUnstyled open={open} onClose={setOpen} title="Delete item">
      <h2>Are you sure you want to delete {item?.title} ?</h2>
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

export default DeleteItemModal;
