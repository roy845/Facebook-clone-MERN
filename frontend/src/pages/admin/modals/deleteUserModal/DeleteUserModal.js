import React, { useState } from "react";
import ModalUnstyled from "../../../../components/modal/Modal";
import { Box, Button } from "@mui/material";
import { deleteUser } from "../../../../Api/ServerAPI";
import toast from "react-hot-toast";
import { deleteObject, listAll, ref } from "firebase/storage";
import storage from "../../../../config/firebase";

const DeleteUserModal = ({
  open,
  setOpen,
  user,
  fetchAgain,
  setFetchAgain,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const removeFiles = async () => {
    try {
      const storageRef = ref(storage, `${user?.username}/files`);
      const filesInFolder = await listAll(storageRef);

      const deletePromises = filesInFolder.items.map(async (fileRef) => {
        await deleteObject(fileRef);
      });

      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data } = await deleteUser(user._id);
      await removeFiles();
      setOpen(false);
      setFetchAgain(!fetchAgain);
      toast.success(
        `User ${user.username} and its files\\posts and stories deleted successfully`
      );

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <ModalUnstyled open={open} onClose={setOpen} title="Delete user">
      <h2>Are you sure you want to delete {user.username} ? </h2>

      <Box
        display="flex"
        sx={{ marginTop: "20px" }}
        justifyContent="space-between"
      >
        <Button
          disabled={loading}
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={handleClose}
        >
          Discard
        </Button>
        <Button disabled={loading} variant="contained" onClick={handleDelete}>
          Confirm
        </Button>
      </Box>
    </ModalUnstyled>
  );
};

export default DeleteUserModal;
