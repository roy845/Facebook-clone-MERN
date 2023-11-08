import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { LinearProgress } from "@mui/material";
import { format } from "timeago.js";
import { deleteObject, ref } from "firebase/storage";
import { useAuth } from "../../context/auth/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import storage from "../../config/firebase";
import { deleteStory } from "../../Api/ServerAPI";
import toast from "react-hot-toast";

const ImagesCarousel = ({ images, storyId, storyAuthor }) => {
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(5000);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentSlideDuration, setCurrentSlideDuration] = useState();
  const { auth } = useAuth();

  const memoizedImages = useMemo(() => images, [images]);
  const memoizedActiveSlide = useMemo(() => activeSlide, [activeSlide]);

  const handleContentClick = () => {
    setIsAutoplayEnabled(false);
  };

  const handleContentRelease = () => {
    setIsAutoplayEnabled(true);
  };

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.realIndex);

    const currentSlide = images[swiper.realIndex];

    const autoplayDelay = currentSlide?.duration
      ? currentSlide.duration * 1000
      : 5000;

    setTimeRemaining(autoplayDelay);
  };

  const handleRemoveFile = async (id) => {
    const fileToRemove = images.find((file) => file.id === id);

    if (fileToRemove) {
      try {
        const storageRef = ref(
          storage,
          `${auth?.userInfo?.username}/files/${fileToRemove.id}`
        );
        await deleteObject(storageRef);
        await deleteStory(storyId, id);
        toast.success("Fle deleted from story successfully");
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  useEffect(() => {
    let interval;

    const currentSlide = images?.[activeSlide];
    const autoplayDelay = currentSlide?.duration
      ? currentSlide.duration * 1000
      : 5000;
    setCurrentSlideDuration(autoplayDelay);

    interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (prevTimeRemaining <= 0) {
          setIsAutoplayEnabled(false);
          setActiveSlide((prevActiveSlide) =>
            prevActiveSlide === images.length - 1 ? 0 : prevActiveSlide + 1
          );
          return autoplayDelay; // Reset the timer based on the content's duration
        }
        return prevTimeRemaining - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAutoplayEnabled, memoizedActiveSlide, memoizedImages]);

  return (
    <div style={{ position: "relative" }}>
      <LinearProgress
        variant="determinate"
        value={(1 - timeRemaining / currentSlideDuration) * 100}
      />

      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        autoplay={{
          delay: currentSlideDuration,
          disableOnInteraction: false,
        }}
        navigation
        onSlideChange={handleSlideChange}
        style={{ width: "100%", height: "max-content" }}
        initialSlide={memoizedActiveSlide}
      >
        {memoizedImages?.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ color: "white" }}>{format(image.createdAt)}</div>
              {storyAuthor._id === auth?.userInfo?._id && (
                <CloseIcon
                  className="removeIcon"
                  onClick={() => handleRemoveFile(image.id)}
                />
              )}

              <img
                width="400px"
                height="400px"
                src={image.url}
                sx={{
                  cursor: "pointer",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImagesCarousel;
