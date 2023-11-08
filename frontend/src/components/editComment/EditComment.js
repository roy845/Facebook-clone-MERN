import { useEffect, useState } from "react";
import {
  getComment,
  getUsersByUsername,
  updateComment,
} from "../../Api/ServerAPI";
import ModalUnstyled from "../modal/Modal";
import { Box, Button, TextField, Paper, Popper } from "@mui/material";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth/AuthContext";
import { useUser } from "../../context/users/UsersContext";
import { defaultProfilePic } from "../../context/users/UsersConstants";
import { filterNamesWithAtSymbol } from "../../utils/helpers";
import { useSocket } from "../../context/socket/SocketContext";

const EditComment = ({ open, post, comment, setOpen }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { activeUsers, friends } = useUser();
  const { auth } = useAuth();
  const { socket } = useSocket();

  const { fetchAgain, setFetchAgain } = useAuth();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const { data } = await getComment(post._id, comment._id);
        setContent(data.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComment();
  }, [post._id, comment._id]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateComment(post._id, comment._id, content);
      const mentions =
        content.includes("@") && filterNamesWithAtSymbol(content);
      const { data } = await getUsersByUsername(mentions);

      socket.emit("postMention", { data, auth, post });
      setLoading(false);
      toast.success("Comment updated successfully");

      setOpen(false);
      setAnchorEl(null);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ModalUnstyled open={open} onClose={setOpen} title="Edit Comment">
      <Popper
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ zIndex: 99999, marginBottom: "100px" }}
        placement="top-start"
      >
        <Paper>
          {friends.map((friend) => (
            <li
              className="friendListItem"
              key={friend.username}
              onClick={() => {
                setContent((prevContent) => prevContent + friend.username);

                setAnchorEl(null);
              }}
            >
              <div className="rightbarProfileImgContainer">
                <img
                  className="rightbarProfileImg"
                  src={friend.profilePicture.url || defaultProfilePic}
                  alt=""
                />
                {activeUsers.some(
                  (active) => active?.userInfo?._id === friend._id
                ) ? (
                  <span className="rightbarOnline"></span>
                ) : (
                  <span className="rightbarOffline"></span>
                )}
              </div>
              <span className="rightbarUsername">{friend.username}</span>
            </li>
          ))}
        </Paper>
      </Popper>
      <TextField
        fullWidth
        label="content"
        value={content}
        onChange={(e) => {
          const newValue = e.target.value;
          setContent(newValue);
          if (newValue.includes("@")) {
            setAnchorEl(e.currentTarget);
          }
        }}
        sx={{ width: "500px", mt: "10px" }}
      />

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
          SAVE
        </Button>
      </Box>
    </ModalUnstyled>
  );
};

export default EditComment;
