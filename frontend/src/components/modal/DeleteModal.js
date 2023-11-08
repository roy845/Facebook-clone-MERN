import { Box } from "@mui/material";
import { useModal } from "../../context/modals/ModalContext";
import ModalUnstyled from "../modal/Modal";
import Button from "@mui/material/Button";
import { deletePost } from "../../Api/ServerAPI";
import { useAuth } from "../../context/auth/AuthContext";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import storage from "../../config/firebase";
import toast from "react-hot-toast";

const DeleteModal = ({ post }) => {
  const { open, onClose } = useModal();
  const [loading, setLoading] = useState(false);
  const { auth, fetchAgain, setFetchAgain } = useAuth();

  const handleRemoveFile = async (id) => {
    const fileToRemove = post?.files?.find((file) => file.id === id);

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
      setLoading(true);
      await deletePost(post._id, auth?.userInfo?._id);
      for (const file of post?.files) {
        await handleRemoveFile(file?.id);
      }
      toast.success("Post deleted successfully");

      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <ModalUnstyled open={open} onClose={onClose} title="Delete Post">
      <p style={{ marginBottom: "10px" }}>
        Are you sure you want to delete this post?
      </p>
      <Box display="flex" justifyContent="space-between">
        <Button
          disabled={loading}
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button disabled={loading} variant="contained" onClick={handleDelete}>
          OK
        </Button>
      </Box>
    </ModalUnstyled>
  );
};

export default DeleteModal;
