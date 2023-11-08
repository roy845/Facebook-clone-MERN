import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getFriendsByUsername, getUserByUsername } from "../../Api/ServerAPI";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/users/UsersContext";
import { useAuth } from "../../context/auth/AuthContext";
import UpdateCoverImageModal from "../../components/modal/UpdateCoverImageModal";
import UpdateProfileModal from "../../components/modal/UpdateProfileModal";
import {
  defaultCoverPic,
  defaultProfilePic,
} from "../../context/users/UsersConstants";
import SwipeableTemporaryDrawer from "../../components/SwipeableDrawer/SwipeableDrawer";

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const navigate = useNavigate();
  const { myFollowings } = useUser();
  const { auth } = useAuth();
  const { setFriendsByUsername } = useUser();
  const [type, setType] = useState("");
  const [open, setOpen] = useState("");

  const handleUpdateImageCover = () => {
    if (user._id === auth?.userInfo?._id || auth?.userInfo?.isAdmin) {
      setType("UpdateImageCover");
      setOpen(true);
    }
  };

  const handleUpdateProfile = () => {
    if (user._id === auth?.userInfo?._id || auth?.userInfo?.isAdmin) {
      setType("UpdateProfile");
      setOpen(true);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserByUsername(username);

        setUser(data);
      } catch (error) {
        if (error?.response?.status === 400) {
          navigate("/notfound");
        }
      }
    };
    fetchUser();
  }, [username, navigate]);

  useEffect(() => {
    const fetchFriendsByUsername = async () => {
      try {
        const { data } = await getFriendsByUsername(username);
        setFriendsByUsername(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriendsByUsername();
  }, [username, setFriendsByUsername]);

  return (
    <>
      <SwipeableTemporaryDrawer />
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                onClick={handleUpdateImageCover}
                className="profileCoverImg"
                src={
                  !user?.coverPicture?.url
                    ? defaultCoverPic
                    : user?.coverPicture?.url
                }
                alt=""
              />
              <img
                onClick={handleUpdateProfile}
                className="profileUserImg"
                src={
                  !user?.profilePicture?.url
                    ? defaultProfilePic
                    : user?.profilePicture?.url
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>

          <div className="profileRightBottom">
            {myFollowings.includes(user._id) && <Feed username={username} />}

            {auth?.userInfo?.username === username && (
              <Feed username={username} />
            )}

            <Rightbar user={user} />
          </div>
        </div>
      </div>
      {open && type === "UpdateImageCover" && (
        <UpdateCoverImageModal user={user} open={open} setOpen={setOpen} />
      )}
      {open && type === "UpdateProfile" && (
        <UpdateProfileModal user={user} open={open} setOpen={setOpen} />
      )}
    </>
  );
}
