import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useAuth } from "../../context/auth/AuthContext";
import { deleteObject, ref } from "firebase/storage";
import storage from "../../config/firebase";

const arrowIconStyles = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "45px",
  color: "#000",
  zIndex: 1,
  cursor: "pointer",
};

const closeIconStyles = {
  position: "absolute",
  top: "10px",
  left: "10px",
  fontSize: "30px",
  color: "#000",
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};

const ImageSlider = ({ slides, setImages, setFileData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { auth } = useAuth();

  useEffect(() => {
    // Ensure currentIndex is within bounds when slides change
    if (currentIndex >= slides?.length) {
      setCurrentIndex(slides?.length - 1);
    }
  }, [slides, currentIndex]);

  const handleRemoveFile = async (id) => {
    const fileToRemove = slides.find((file) => file?.id === id);

    if (fileToRemove) {
      try {
        const storageRef = ref(
          storage,
          `${auth?.userInfo?.username}/files/${fileToRemove?.id}`
        );

        await deleteObject(storageRef);

        setImages((imageData) => imageData.filter((file) => file?.id !== id));
        setFileData &&
          setFileData((fileData) => fileData.filter((file) => file?.id !== id));

        if (slides?.length > 1) {
          // If there are remaining slides, adjust the currentIndex
          const newIndex =
            currentIndex === slides?.length - 1
              ? currentIndex - 1
              : currentIndex;
          setCurrentIndex(newIndex);
        }
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const currentSlide = slides?.[currentIndex];

  return (
    <div style={sliderStyles}>
      <div>
        {slides?.length > 1 && (
          <ArrowBack
            onClick={goToPrevious}
            style={{ ...arrowIconStyles, left: "32px" }}
          />
        )}
        {slides?.length > 1 && (
          <ArrowForward
            onClick={goToNext}
            style={{ ...arrowIconStyles, right: "32px" }}
          />
        )}
        {!currentSlide?.publish && (
          <CloseIcon
            className="removeIcon"
            onClick={() => handleRemoveFile(currentSlide.id)}
            style={closeIconStyles}
          />
        )}
      </div>
      <div>
        {currentSlide?.url && (
          <img
            src={currentSlide?.url}
            alt="Current Slide"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
      <div style={dotsContainerStyles}>
        {slides?.length > 1 &&
          slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              style={dotStyle}
              onClick={() => goToSlide(slideIndex)}
            >
              {currentIndex === slideIndex ? "●" : "◦"}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageSlider;
