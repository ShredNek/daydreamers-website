/*
* * *
* * * Designed by Flowbite * * *
* * *

* * *
* * * Modified by Daniel Lee, 1/10/23 * * *
* * *
*/

import { useState, useEffect } from "react";

import MissingImg from "../../../assets/images/MissingImage.png";

interface Carousel {
  photos: string[];
}

export default function Carousel({ photos }: Carousel) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // console.log(photos)

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % photos.length);
    }, 5000); // Change the interval duration as needed

    return () => clearInterval(slideInterval);
  }, [photos.length]);

  const handleSlideTo = (index: number) => {
    setCurrentSlide(index);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + photos.length) % photos.length
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % photos.length);
  };

  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out ${index === currentSlide ? "" : "hidden"
              }`}
            data-carousel-item
          >
            <img
              src={photo}
              onError={(e) => (e.currentTarget.src = MissingImg)}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {photos.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-blue-500" : "bg-gray-300"
              }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleSlideTo(index)}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
        data-carousel-prev
        onClick={handlePrevSlide}
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/60  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
            className="w-4 h-4 text-white dark:text-gray-800"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </div>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
        data-carousel-next
        onClick={handleNextSlide}
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/60  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
            className="w-4 h-4 text-white dark:text-gray-800"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
