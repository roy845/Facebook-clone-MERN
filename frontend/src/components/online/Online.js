import { Link } from "react-router-dom";
import { defaultProfilePic } from "../../context/users/UsersConstants";
import { useUser } from "../../context/users/UsersContext";
import "./online.css";

export default function Online({ user }) {
  const { activeUsers } = useUser();

  const isUserActive = activeUsers.some(
    (active) => active?.userInfo?._id === user._id
  );

  return (
    <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={user.profilePicture.url || defaultProfilePic}
            alt=""
          />
          {isUserActive ? (
            <span className="rightbarOnline"></span>
          ) : (
            <span className="rightbarOffline"></span>
          )}
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </Link>
  );
}
