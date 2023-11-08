import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { LinearProgress } from "@mui/material";
import { format } from "timeago.js";
import CloseIcon from "@mui/icons-material/Close";
import { deleteObject, ref } from "firebase/storage";
import { deleteStory } from "../../Api/ServerAPI";
import { useAuth } from "../../context/auth/AuthContext";
import storage from "../../config/firebase";
import toast from "react-hot-toast";

const VideosCarousel = ({ videos, storyId, storyAuthor }) => {
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(5000);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentSlideDuration, setCurrentSlideDuration] = useState();
  const swiperRef = useRef(null);

  const { auth } = useAuth();

  const handleContentClick = () => {
    setIsAutoplayEnabled(false);
  };

  const handleContentRelease = () => {
    setIsAutoplayEnabled(true);
  };

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.realIndex);

    const currentSlide = videos[swiper.realIndex];

    const autoplayDelay = currentSlide?.duration
      ? currentSlide.duration * 1000
      : 5000;

    setTimeRemaining(autoplayDelay);

    // Pause all video elements and play the video for the current slide
    videosRefs.current.forEach((video, index) => {
      if (index === swiper.realIndex) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  const handleRemoveFile = async (id) => {
    const fileToRemove = videos.find((file) => file.id === id);

    if (fileToRemove) {
      try {
        const storageRef = ref(
          storage,
          `${auth?.userInfo?.username}/files/${fileToRemove.id}`
        );
        await deleteObject(storageRef);
        await deleteStory(storyId, id);
        toast.success("File deleted from story successfully");
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  useEffect(() => {
    let interval;

    const currentSlide = videos[activeSlide];
    const autoplayDelay = currentSlide?.duration
      ? currentSlide.duration * 1000
      : 5000;
    setCurrentSlideDuration(autoplayDelay);

    interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining <= 0) {
          setIsAutoplayEnabled(false);
          setActiveSlide((prevActiveSlide) =>
            prevActiveSlide === videos.length - 1 ? 0 : prevActiveSlide + 1
          );
          return autoplayDelay; // Reset the timer based on the content's duration
        }
        return prevTimeRemaining - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAutoplayEnabled, activeSlide, videos]);

  const videosRefs = useRef([]);
  const handleVideoRef = (video, index) => {
    videosRefs.current[index] = video;
  };

  return (
    <div style={{ position: "relative" }}>
      <LinearProgress
        variant="determinate"
        value={(1 - timeRemaining / currentSlideDuration) * 100}
      />

      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        autoplay={{
          delay: currentSlideDuration,
          disableOnInteraction: false,
        }}
        navigation
        onSlideChange={handleSlideChange}
        style={{ width: "100%", height: "max-content" }}
        initialSlide={activeSlide}
      >
        {videos?.map((video, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ color: "white" }}>{format(video.createdAt)}</div>

              {storyAuthor._id === auth?.userInfo?._id && (
                <CloseIcon
                  className="removeIcon"
                  onClick={() => handleRemoveFile(video.id)}
                />
              )}
              <div>
                <video
                  ref={(video) => handleVideoRef(video, index)}
                  autoPlay
                  onClick={handleContentClick}
                  onEnded={() => setIsAutoplayEnabled(true)}
                  className="postVideo"
                  width="400px"
                  height="400px"
                  controls
                >
                  <source src={video.url} type="video/mp4" />
                </video>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideosCarousel;
