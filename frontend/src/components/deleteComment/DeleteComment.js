import { Box, Button } from "@mui/material";
import ModalUnstyled from "../modal/Modal";
import { useState } from "react";
import { deleteCommentFromPost } from "../../Api/ServerAPI";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth/AuthContext";

const DeleteComment = ({ open, post, comment, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { fetchAgain, setFetchAgain } = useAuth();

  const handleSave = async () => {
    try {
      setLoading(true);
      await deleteCommentFromPost(post._id, comment._id);
      toast.success("Comment deleted successfully");
      setLoading(false);
      setFetchAgain(!fetchAgain);
      setOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ModalUnstyled open={open} onClose={setOpen} title="Delete Comment">
      <p style={{ marginBottom: "10px" }}>
        Are you sure you want to delete this comment?
      </p>
      <Box
        display="flex"
        sx={{ marginTop: "20px" }}
        justifyContent="space-between"
        gap="200px"
      >
        <Button
          disabled={loading}
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={() => {
            setOpen(false);
          }}
        >
          Discard
        </Button>
        <Button disabled={loading} variant="contained" onClick={handleSave}>
          OK
        </Button>
      </Box>
    </ModalUnstyled>
  );
};

export default DeleteComment;
