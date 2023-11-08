import React, { useEffect, useState } from "react";
import { getAllStories, getUserById } from "../../Api/ServerAPI";
import StorySlider from "../storySlider/StorySlider";
import StoryDialog from "../Dialog/Dialog";
import { Avatar, Typography } from "@mui/material";
import { defaultProfilePic } from "../../context/users/UsersConstants";
import { useAuth } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

const StorySliderModal = ({ open, setOpen, selectedId }) => {
  const [story, setStory] = useState();
  const [user, setUser] = useState();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchAllStoriesByUserId = async () => {
      try {
        const { data } = await getAllStories(selectedId);
        setStory(data);
      } catch (error) {
        console.log(error);
      }
    };

    selectedId && fetchAllStoriesByUserId();
  }, [selectedId]);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const { data } = await getUserById(selectedId);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    selectedId && fetchUserById();
  }, [selectedId]);

  return (
    <>
      {story?.[0] ? (
        <StoryDialog open={open} setOpen={setOpen}>
          <div
            className="user-info"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="user-avatar">
              <Link to={`/profile/${user?.username}`}>
                <Avatar src={user?.profilePicture?.url || defaultProfilePic} />
              </Link>
            </div>
            <div className="user-details">
              <Typography
                variant="h6"
                style={{ color: "white", marginLeft: "10px" }}
              >
                {user?.username}
              </Typography>
            </div>
          </div>
          <StorySlider story={story?.[0]} setOpen={setOpen} />
        </StoryDialog>
      ) : null}
    </>
  );
};

export default StorySliderModal;
