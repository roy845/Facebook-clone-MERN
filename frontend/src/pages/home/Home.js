import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { useUser } from "../../context/users/UsersContext";
import { useEffect } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { getFriends, getFriendsByUsername } from "../../Api/ServerAPI";
import SwipeableTemporaryDrawer from "../../components/SwipeableDrawer/SwipeableDrawer";

export default function Home() {
  const { friends, setFriends } = useUser();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { data } = await getFriends(auth?.userInfo?._id);
        setFriends(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriends();
  }, [auth, setFriends]);

  return (
    <>
      <SwipeableTemporaryDrawer />
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar friends={friends} />
      </div>
    </>
  );
}
