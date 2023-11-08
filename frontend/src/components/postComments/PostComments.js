import "./postComments.css";
import ModalUnstyled from "../modal/Modal";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Popper,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { format } from "timeago.js";
import { useAuth } from "../../context/auth/AuthContext";
import {
  addCommentToPost,
  getCommentLikes,
  getUsersByUsername,
  likeComment,
} from "../../Api/ServerAPI";
import {
  DeleteOutline as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import EditComment from "../editComment/EditComment";
import DeleteComment from "../deleteComment/DeleteComment";
import NoComments from "../noComments/NoComments";
import { Link } from "react-router-dom";
import CommentLikesModal from "../commentLikesModal/CommentLikesModal";
import toast from "react-hot-toast";
import { useUser } from "../../context/users/UsersContext";
import { filterNamesWithAtSymbol } from "../../utils/helpers";
import { useSocket } from "../../context/socket/SocketContext";
import { defaultProfilePic } from "../../context/users/UsersConstants";

const PostComments = ({ open, setOpen, post }) => {
  const [content, setContent] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});
  const [loading, setLoading] = useState(false);
  const [openCommentLikesModal, setOpenCommentLikesModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { auth, fetchAgain, setFetchAgain } = useAuth();
  const { socket } = useSocket();
  const { activeUsers, friends } = useUser();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    // Fetch the likes for each comment when the component mounts
    const fetchCommentLikes = async () => {
      setLoading(true);
      const likesPerComment = await Promise.all(
        post?.comments?.map(async (comment) => {
          const { data } = await getCommentLikes(post._id, comment._id);
          return { commentId: comment._id, likes: data.length };
        })
      );
      // Store likes in an object with comment IDs as keys
      const commentLikesObj = {};
      likesPerComment.forEach((item) => {
        commentLikesObj[item.commentId] = item.likes;
      });
      setLoading(false);
      setCommentLikes(commentLikesObj);
    };

    fetchCommentLikes();
  }, [post, fetchAgain]);

  const likeHandler = async (comment) => {
    try {
      setSelectedComment(comment);
      setLoading(true);
      const { data } = await likeComment(
        post._id,
        comment._id,
        auth.userInfo?._id
      );
      // Update the likes for the specific comment in the state
      setCommentLikes({
        ...commentLikes,
        [comment._id]: data.likes.length,
      });
      setLoading(false);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const handleCommentChange = (event) => {
    const newValue = event.target.value;
    setContent(newValue);
    if (newValue.includes("@")) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmitComment = async () => {
    try {
      const commentToAdd = {
        author: auth?.userInfo?._id,
        content: content,
        edited: false,
      };
      await addCommentToPost(post._id, commentToAdd);
      const mentions =
        content.includes("@") && filterNamesWithAtSymbol(content);
      const { data } = await getUsersByUsername(mentions);

      socket.emit("postMention", { data, auth, post });
      setAnchorEl(null);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }

    setContent("");
  };

  const handleEditComment = (comment) => {
    setSelectedComment(comment);
    setOpenEditModal(true);
  };

  const handleDeleteComment = (comment) => {
    setSelectedComment(comment);
    setOpenDeleteModal(true);
  };

  const handleCommentLikesModal = (comment) => {
    setSelectedComment(comment);
    setOpenCommentLikesModal(true);
  };

  const renderContentWithMentions = (content) => {
    const contentArray = content?.split(" ");
    return contentArray?.map((word, index) => {
      if (word.startsWith("@")) {
        // This is a mention, let's extract the username
        const username = word?.slice(1);
        // Check if the username is in your friends list
        const isFriend = friends?.find(
          (friend) => friend.username === username
        );
        if (isFriend) {
          return (
            <Link
              to={`/profile/${username}`}
              key={index}
              style={{ textDecoration: "none", color: "blue" }}
            >
              {word}{" "}
            </Link>
          );
        } else {
          return word + " "; // Mention not found in friends list, render as plain text
        }
      } else {
        return word + " "; // Regular word, render as plain text
      }
    });
  };

  return (
    <ModalUnstyled open={open} onClose={setOpen} title="Comments">
      <div>
        {post.comments.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <NoComments />
          </div>
        )}

        {post?.comments?.map((comment, index) => (
          <Paper
            elevation={3}
            key={comment._id}
            style={{
              padding: "16px",
              marginBottom: "15px",
            }}
          >
            <Grid
              container
              spacing={2}
              key={comment._id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <Grid item>
                <Link
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  to={`/profile/${comment?.author?.username}`}
                >
                  <Avatar
                    alt={comment.author}
                    src={
                      comment?.author?.profilePicture?.url || defaultProfilePic
                    }
                  />
                </Link>
              </Grid>

              <Grid item xs>
                <Typography variant="subtitle1" component="div">
                  <strong>{comment?.author?.username}</strong>
                </Typography>

                <Typography variant="h5">
                  {renderContentWithMentions(comment.content)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {comment.edited && "(Edited)"}
                  {format(comment.createdAt)}
                </Typography>

                <div className="postBottomLeft">
                  <img
                    className="likeIcon"
                    src={`${PF}like.png`}
                    alt=""
                    onClick={() => likeHandler(comment)}
                  />
                  <img
                    className="likeIcon"
                    src={`${PF}heart.png`}
                    alt=""
                    onClick={() => likeHandler(comment)}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginLeft: "4px", cursor: "pointer" }}
                    onClick={() => handleCommentLikesModal(comment)}
                  >
                    {comment._id === selectedComment?._id ? (
                      loading ? (
                        <CircularProgress size={15} />
                      ) : (
                        commentLikes[comment._id] || 0
                      )
                    ) : (
                      commentLikes[comment._id] || 0
                    )}{" "}
                    people like it
                  </Typography>
                </div>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  {auth?.userInfo?._id === comment.author?._id ||
                  auth?.userInfo?.isAdmin ? (
                    <IconButton
                      color="primary"
                      onClick={() => handleEditComment(comment)}
                    >
                      <EditIcon />
                    </IconButton>
                  ) : null}
                  {auth?.userInfo?._id === comment.author?._id ||
                  auth?.userInfo?.isAdmin ? (
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteComment(comment)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ))}
        <Paper style={{ position: "sticky", bottom: 0, zIndex: 1 }}>
          <Box display="flex" alignItems="center">
            <Popper
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ zIndex: 99999, marginBottom: "100px" }}
              placement="top-start"
            >
              <Paper>
                {friends?.map((friend) => (
                  <li
                    className="friendListItem"
                    key={friend.username}
                    onClick={() => {
                      setContent(
                        (prevContent) => prevContent + friend.username
                      );

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
              label="Add a Comment"
              fullWidth
              value={content}
              onChange={handleCommentChange}
              sx={{ width: "500px" }}
            />
            <Button
              disabled={!content}
              variant="contained"
              color="primary"
              onClick={handleSubmitComment}
              style={{ marginLeft: "8px" }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Paper>
      </div>
      {openEditModal && (
        <EditComment
          open={openEditModal}
          setOpen={setOpenEditModal}
          post={post}
          comment={selectedComment}
        />
      )}
      {openDeleteModal && (
        <DeleteComment
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          post={post}
          comment={selectedComment}
        />
      )}

      {openCommentLikesModal && (
        <CommentLikesModal
          open={openCommentLikesModal}
          setOpen={setOpenCommentLikesModal}
          post={post}
          comment={selectedComment}
        />
      )}
    </ModalUnstyled>
  );
};

export default PostComments;
