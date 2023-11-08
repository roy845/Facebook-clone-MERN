import "./stories.css";
import { useAuth } from "../../context/auth/AuthContext";
// import { defaultProfilePic } from "../../context/users/UsersConstants";
import { useUser } from "../../context/users/UsersContext";
import { useEffect, useState } from "react";
import StoryModal from "../modal/StoryModal";
// import { getAllStories } from "../../Api/ServerAPI";
import StorySliderModal from "../modal/StorySliderModal";
import UserSlide from "../UsersSlide/UserSlide";

const Stories = () => {
  const { auth } = useAuth();
  const { friends } = useUser();
  const [users, setUsers] = useState();
  const [openCreateStories, setOpenCreateStories] = useState(false);
  // const [stories, setStories] = useState([]);
  const [openStorySliderModal, setOpenStorySliderModal] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const relevantDetails = {
    _id: auth?.userInfo?._id,
    username: auth?.userInfo?.username,
    profilePicture: auth?.userInfo?.profilePicture,
  };

  // useEffect(() => {
  //   const fetchStories = async () => {
  //     try {
  //       const { data } = await getAllStories(auth?.userInfo?._id);

  //       setStories(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   auth?.userInfo?._id && fetchStories();
  // }, []);

  useEffect(() => {
    // Combine auth and friends into a single array with auth as the first item
    const combinedUsers = [relevantDetails, ...friends];
    setUsers(combinedUsers);
  }, [auth, friends]);

  return (
    <div className="stories">
      <UserSlide
        profiles={users}
        setOpenStorySliderModal={setOpenStorySliderModal}
        setOpenCreateStories={setOpenCreateStories}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
      />

      <StoryModal
        open={openCreateStories}
        setOpen={setOpenCreateStories}
        selectedId={selectedId}
      />
      {openStorySliderModal && (
        <StorySliderModal
          open={openStorySliderModal}
          setOpen={setOpenStorySliderModal}
          // stories={stories}
          selectedId={selectedId}
        />
      )}
    </div>
  );
};

export default Stories;
