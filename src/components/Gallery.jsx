import { useState, useEffect, useRef } from "react";
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsChevronCompactDown,
} from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import YouTube from "react-youtube";

function Gallery() {
  // Image Carousel Data
  const imageSlides = [
    { url: "https://www.sportime.gr/wp-content/uploads/2024/05/4276198.jpg" },
    {
      url: "https://sportday.gr/images/2024/05/19/sportday_20240519220634_174847-960x640.jpg",
    },
    {
      url: "https://www.cretapost.gr/wp-content/uploads/2024/05/paok_nea_mesa_190524.jpg",
    },
    {
      url: "https://s2.aek365.org/uploads/articles/images/5/523cb19e30be6b19e61f87dfc3b80300_991707.jpg",
    },
    {
      url: "https://s2.aek365.org/uploads/articles/images/a/ab39c12939f648bc717c31a94cb369f4_991707.jpg",
    },
    {
      url: "https://www.newsit.gr/wp-content/uploads/2024/05/paok2-1-1200x800.jpg",
    },
    { url: "https://www.slgr.gr/superleaguestorage/2024/5/2068_6226425.jpg" },
    {
      url: "https://cdn.ethnos.gr/resources/images/2c6ef54a-ad6a-4e5e-a609-45fa16f1d443.jpg",
    },
    {
      url: "https://www.athensvoice.gr/images/1074x600/jpg/sites/default/files/article/2019/04/22/2130951_1_1.jpg",
    },
    {
      url: "https://primesport.gr/wp-content/uploads/2024/05/paok-badounas.jpg",
    },
  ];

  const videoSlides = [
    { id: "89ZDjVX2yq4" },
    { id: "kvoUzHtx8yM" },
    { id: "uAHVEJLd-8Y" },
  ];

  // Image Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Ref for the YouTube player instance
  const playerRef = useRef(null);

  // Cleanup player on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const prevImageSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageSlides.length - 1 : prevIndex - 1
    );
  };

  const nextImageSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageSlides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImageSlide = (slideIndex) => {
    setCurrentImageIndex(slideIndex);
  };

  const prevVideoSlide = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videoSlides.length - 1 : prevIndex - 1
    );
  };

  const nextVideoSlide = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videoSlides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToVideoSlide = (slideIndex) => {
    setCurrentVideoIndex(slideIndex);
  };

  const onReady = (event) => {
    // Store player instance
    playerRef.current = event.target;
  };

  return (
    <div className="max-w-[850px] m-auto p-4 pt-28 space-y-8">
      <h2 className="text-center text-3xl font-rubik">PAOK Hub Gallery</h2>

      {/* Video Carousel */}
      <div className="relative group">
        <div className="w-full pb-[56.25%] relative bg-black rounded-2xl overflow-hidden">
          <YouTube
            videoId={videoSlides[currentVideoIndex].id}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 0,
              },
            }}
            className="absolute top-0 left-0 w-full h-full"
            onReady={onReady}
            aria-label="Current video slide"
          />
        </div>
        {/* Left Arrow */}
        <button
          onClick={prevVideoSlide}
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/80 text-white cursor-pointer"
          aria-label="Previous video slide"
        >
          <BsChevronCompactLeft size={30} />
        </button>
        {/* Right Arrow */}
        <button
          onClick={nextVideoSlide}
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/80 text-white cursor-pointer"
          aria-label="Next video slide"
        >
          <BsChevronCompactRight size={30} />
        </button>
        <div className="flex top-4 justify-center py-2">
          {videoSlides.map((video, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToVideoSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${
                slideIndex === currentVideoIndex
                  ? "text-white"
                  : "text-gray-500"
              }`}
              aria-label={`Go to video slide ${slideIndex + 1}`}
            >
              <RxDotFilled />
            </button>
          ))}
        </div>
        <div className="hidden [@media(min-width:1000px)]:flex [@media(min-width:1300px)]:hidden justify-center items-center">
          <BsChevronCompactDown size={30} className="text-gray-500" />
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative group py-24">
        <div
          style={{
            backgroundImage: `url(${imageSlides[currentImageIndex].url})`,
          }}
          className="w-full pb-[56.25%] rounded-2xl bg-center bg-cover duration-500"
          aria-label={`Current image slide ${currentImageIndex + 1}`}
        ></div>
        {/* Left Arrow */}
        <button
          onClick={prevImageSlide}
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/80 text-white cursor-pointer"
          aria-label="Previous image slide"
        >
          <BsChevronCompactLeft size={30} />
        </button>
        {/* Right Arrow */}
        <button
          onClick={nextImageSlide}
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/80 text-white cursor-pointer"
          aria-label="Next image slide"
        >
          <BsChevronCompactRight size={30} />
        </button>
        <div className="flex top-4 justify-center py-2">
          {imageSlides.map((slide, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToImageSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${
                slideIndex === currentImageIndex
                  ? "text-white"
                  : "text-gray-500"
              }`}
              aria-label={`Go to image slide ${slideIndex + 1}`}
            >
              <RxDotFilled />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
