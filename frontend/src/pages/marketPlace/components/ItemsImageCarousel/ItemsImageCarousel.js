import "./itemsImageCarousel.css";
import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const ItemsImageCarousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides?.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      <div className="carousel-container">
        {slides?.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img
                  src={slide}
                  style={{ height: 240, maxWidth: 345 }}
                  alt="travel image"
                  className="image"
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="small-images">
        {slides?.map((slide, index) => {
          return (
            <img
              src={slide}
              alt="travel image"
              key={index}
              className={
                index === current ? "small-image active" : "small-image"
              }
            />
          );
        })}
      </div>
    </section>
  );
};

export default ItemsImageCarousel;
