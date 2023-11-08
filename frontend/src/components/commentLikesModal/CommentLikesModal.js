import { useEffect, useState } from "react";
import { getCommentLikes } from "../../Api/ServerAPI";
import ModalUnstyled from "../modal/Modal";
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Spinner from "../Spinner/Spinner";
import NoLikes from "../NoLikes/NoLikes";

const CommentLikesModal = ({ open, setOpen, post, comment }) => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCommentLikes = async () => {
      try {
        setLoading(true);
        const { data } = await getCommentLikes(post._id, comment._id);
        setLikes(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchCommentLikes();
  }, [comment._id, post._id]);

  return (
    <ModalUnstyled open={open} onClose={setOpen} title="Likes">
      {loading ? (
        <Spinner text="likes" />
      ) : (
        <div>
          {likes.length === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <NoLikes />
            </div>
          )}
          {likes?.map((like, index) => (
            <Card
              key={like._id}
              elevation={3}
              style={{
                width: "400px",
                marginBottom: "12px",
              }}
            >
              <CardContent
                style={{ display: "flex", alignItems: "flex-start" }}
              >
                <Link
                  style={{ textDecoration: "none", cursor: "pointer" }}
                  to={`/profile/${like?.username}`}
                >
                  <Avatar
                    alt={like?.username}
                    src={like?.profilePicture?.url}
                  />
                </Link>

                <Typography
                  variant="subtitle1"
                  style={{ marginLeft: "20px" }}
                  component="div"
                >
                  <strong>{like?.username}</strong>
                  <IconButton size="small">
                    <ThumbUpIcon style={{ color: "blue" }} />
                  </IconButton>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ModalUnstyled>
  );
};

export default CommentLikesModal;
