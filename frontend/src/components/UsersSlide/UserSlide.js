import { Avatar, Typography, Button, Tooltip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";

const UserSlide = ({
  profiles,
  setOpenStorySliderModal,
  setOpenCreateStories,
  setSelectedId,
}) => {
  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={1}
      navigation
      style={{ width: "100%", height: "max-content" }}
    >
      {profiles?.map((profile, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={profile?.profilePicture?.url}
              onClick={() => {
                setSelectedId(profile?._id);
                setOpenStorySliderModal(true);
              }}
              sx={{
                width: "100px",
                height: "100px",
                cursor: "pointer",
                // border: hasStory ? "2px solid green" : "none",
              }}
            />
            <Typography>
              <strong>{profile.username}</strong>
            </Typography>

            {/* Add plus button only on the first slide */}
            {index === 0 && (
              <Tooltip title={"Create / Update story"}>
                <Button
                  onClick={() => {
                    setSelectedId(profile?._id);
                    setOpenCreateStories(true);
                  }}
                >
                  +
                </Button>
              </Tooltip>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default UserSlide;
