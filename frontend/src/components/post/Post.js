import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { getUserById, likePost } from "../../Api/ServerAPI";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { toast } from "react-hot-toast";
import DynamicGrid from "../grid/Grid";
import MenuIntroduction from "../menu/Menu";
import ImageSlider from "../imageSlider/ImageSlider";
import { defaultProfilePic } from "../../context/users/UsersConstants";
import PostComments from "../postComments/PostComments";
import { Typography } from "@mui/material";
import LikesModal from "../likesModal/LikesModal";

export default function Post({ post }) {
  const [like, setLike] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [openModalLikes, setOpenModalLikes] = useState(false);
  const [images, setImages] = useState(
    post.files.filter((file) => file.type === "image")
  );
  const [OpenPostComments, setOpenPostComments] = useState(false);
  const [type, setType] = useState("");

  const handleComments = () => {
    setType("CommentsModal");

    setOpenPostComments(true);
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { auth } = useAuth();

  useEffect(() => {
    setIsLiked(post?.likes?.includes(auth?.userInfo?._id));
  }, [auth?.userInfo?._id, post.likes]);

  const likeHandler = async () => {
    try {
      await likePost(post._id, auth.userInfo?._id);
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserById(post.userId);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [post.userId]);

  const handleLikesModal = () => {
    setOpenModalLikes(true);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  !user?.profilePicture?.url
                    ? defaultProfilePic
                    : user?.profilePicture?.url
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>

            <span className="postDate">{format(post.createdAt)}</span>
          </div>

          <div className="postTopRight">
            {auth?.userInfo?._id === post.userId || auth?.userInfo.isAdmin ? (
              <MenuIntroduction icon={<MoreVertIcon />} post={post} />
            ) : null}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <Typography variant="body2" color="textSecondary">
            {post.edited && "(Edited)"}
          </Typography>
          {images && images?.length > 0 && (
            <ImageSlider slides={images} setImages={setImages} />
          )}

          {post && (
            <div className="postFiles">
              <DynamicGrid post={post} />
            </div>
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span
              className="postLikeCounter"
              style={{ cursor: "pointer" }}
              onClick={handleLikesModal}
            >
              {like} people like it
            </span>
          </div>
          <div className="postBottomRight">
            <span
              className="postCommentText"
              onClick={() => handleComments(post)}
            >
              {post.comments.length > 0 && post.comments.length} comments
            </span>
          </div>
        </div>
      </div>
      {OpenPostComments && type === "CommentsModal" && (
        <PostComments
          open={OpenPostComments}
          setOpen={setOpenPostComments}
          post={post}
        />
      )}

      {openModalLikes && (
        <LikesModal
          open={openModalLikes}
          setOpen={setOpenModalLikes}
          post={post}
          like={like}
        />
      )}
    </div>
  );
}
