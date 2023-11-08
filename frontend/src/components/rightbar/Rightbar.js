import "./rightbar.css";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/users/UsersContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { followUser, getMyFollowings, unfollowUser } from "../../Api/ServerAPI";
import toast from "react-hot-toast";
import { Avatar, Button } from "@mui/material";
import { defaultProfilePic } from "../../context/users/UsersConstants";
import { useAuth } from "../../context/auth/AuthContext";
import ModalUnstyled from "../modal/Modal";

export default function Rightbar({ user }) {
  const { myFollowings, setMyFollowing, fetchAgain, setFetchAgain } = useUser();
  const { auth } = useAuth();
  const { friends, friendsByUsername } = useUser();
  const [birthdayFriends, setBirthdayFriends] = useState([]);
  const [showAllBirthdayFriends, setShowAllBirthdayFriends] = useState(false);

  useEffect(() => {
    const fetchMyFollowings = async () => {
      try {
        const { data } = await getMyFollowings(auth?.userInfo?._id);
        setMyFollowing(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchMyFollowings();
  }, [fetchAgain, auth?.userInfo?._id, setMyFollowing]);

  useEffect(() => {
    const today = new Date();

    const filteredFriends = friends.filter((friend) => {
      const friendBirthday = new Date(friend.birthday);
      return (
        friendBirthday.getDate() === today.getDate() &&
        friendBirthday.getMonth() === today.getMonth()
      );
    });

    const currentUserBirthday = new Date(auth?.userInfo?.birthday);
    if (
      currentUserBirthday.getDate() === today.getDate() &&
      currentUserBirthday.getMonth() === today.getMonth()
    ) {
      filteredFriends.push(auth?.userInfo);
    }

    setBirthdayFriends(filteredFriends);
  }, [friends]);

  const handleFollow = async () => {
    try {
      const { data } = await followUser(user._id, auth?.userInfo?._id);

      setMyFollowing(data);
      setFetchAgain(!fetchAgain);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const { data } = await unfollowUser(user._id, auth?.userInfo?._id);

      setMyFollowing(data);
      setFetchAgain(!fetchAgain);
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  };

  const onCloseBirthdays = () => setShowAllBirthdayFriends(false);

  const date = new Date(user?.birthday);
  const formattedBirthdate = date.toLocaleDateString();

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          {birthdayFriends?.length > 0 && (
            <img className="birthdayImg" src="assets/gift.png" alt="" />
          )}
          <span className="birthdayText">
            {birthdayFriends?.length === 0 ? null : (
              <>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${birthdayFriends?.[0]?.username}`}
                >
                  <b>
                    {birthdayFriends?.[0]?.username + " has a birthday today"}
                  </b>
                </Link>{" "}
                {birthdayFriends?.length > 1 && (
                  <Button
                    variant="outlined"
                    className="viewAllButton"
                    onClick={() => setShowAllBirthdayFriends(true)}
                  >
                    {birthdayFriends?.length > 1
                      ? `and ${birthdayFriends?.length - 1} other${
                          birthdayFriends?.length > 2 ? "s" : ""
                        } have a birthday today`
                      : null}
                  </Button>
                )}
              </>
            )}
          </span>
        </div>

        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((friend) => (
            <Online key={friend._id} user={friend} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== auth?.userInfo?.username &&
        !myFollowings?.includes(user?._id) ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            {user.username !== auth?.userInfo?.username &&
              myFollowings?.includes(user?._id) && (
                <Button
                  endIcon={<RemoveIcon />}
                  variant="contained"
                  className="rightbarFollowButton"
                  onClick={handleUnfollow}
                >
                  Unfollow
                </Button>
              )}
            {user.username !== auth?.userInfo?.username &&
              !myFollowings?.includes(user?._id) && (
                <Button
                  endIcon={<AddIcon />}
                  variant="contained"
                  className="rightbarFollowButton"
                  onClick={handleFollow}
                >
                  Follow
                </Button>
              )}
          </div>
        ) : (
          <>
            {user.username !== auth?.userInfo?.username &&
              myFollowings?.includes(user?._id) && (
                <Button
                  endIcon={<RemoveIcon />}
                  variant="contained"
                  className="rightbarFollowButton"
                  onClick={handleUnfollow}
                >
                  Unfollow
                </Button>
              )}
            {user.username !== auth?.userInfo?.username &&
              !myFollowings?.includes(user?._id) && (
                <Button
                  endIcon={<AddIcon />}
                  variant="contained"
                  className="rightbarFollowButton"
                  onClick={handleFollow}
                >
                  Follow
                </Button>
              )}
          </>
        )}

        {myFollowings?.includes(user?._id) && (
          <>
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{user.city}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{user.from}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">
                  {user.relationship === 1
                    ? "Single"
                    : user.relationship === 1
                    ? "Married"
                    : "-"}
                </span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Birthday:</span>
                <span className="rightbarInfoValue">{formattedBirthdate}</span>
              </div>
            </div>
            {user.username === auth?.userInfo?.username ? (
              <>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                  {friends.map((friend) => (
                    <Link
                      key={friend._id}
                      to={"/profile/" + friend.username}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="rightbarFollowing">
                        <img
                          src={
                            !friend.profilePicture.url
                              ? defaultProfilePic
                              : friend.profilePicture.url
                          }
                          alt=""
                          className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">
                          {friend.username}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">
                  {friendsByUsername.map((friend) => (
                    <Link
                      key={friend._id}
                      to={"/profile/" + friend.username}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="rightbarFollowing">
                        <img
                          src={
                            !friend.profilePicture.url
                              ? defaultProfilePic
                              : friend.profilePicture.url
                          }
                          alt=""
                          className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">
                          {friend.username}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {auth?.userInfo?.username === user?.username && (
          <>
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{user.city}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{user.from}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">
                  {user.relationship === 1
                    ? "Single"
                    : user.relationship === 2
                    ? "Married"
                    : "-"}
                </span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Birthday:</span>
                <span className="rightbarInfoValue">{formattedBirthdate}</span>
              </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
              {friends.map((friend) => (
                <Link
                  key={friend._id}
                  to={"/profile/" + friend.username}
                  style={{ textDecoration: "none" }}
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        !friend.profilePicture.url
                          ? defaultProfilePic
                          : friend.profilePicture.url
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">
                      {friend.username}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
      <ModalUnstyled
        title="Birthdays"
        open={showAllBirthdayFriends}
        onClose={onCloseBirthdays}
      >
        <div className="modalContent">
          {birthdayFriends.map((friend) => (
            <>
              <div
                key={friend._id}
                className="user-info"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Link to={`/profile/${friend.username}`}>
                  <Avatar
                    src={friend?.profilePicture?.url || defaultProfilePic}
                    sx={{ marginTop: "10px" }}
                  />
                </Link>
                <span>{friend.username}</span>
              </div>
            </>
          ))}
        </div>
      </ModalUnstyled>
    </div>
  );
}
