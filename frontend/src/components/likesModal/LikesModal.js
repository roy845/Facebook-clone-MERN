import { useEffect, useState } from "react";
import { getPostLikes } from "../../Api/ServerAPI";
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

const LikesModal = ({ open, setOpen, post, like }) => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostLikes = async () => {
      try {
        setLoading(true);
        const { data } = await getPostLikes(post._id);
        setLikes(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPostLikes();
  }, [post._id]);

  return (
    <ModalUnstyled open={open} onClose={setOpen} title="Likes">
      {loading ? (
        <Spinner text="likes" />
      ) : (
        <div>
          {like === 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <NoLikes post />
            </div>
          )}
          {likes.map((like, index) => (
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

export default LikesModal;
