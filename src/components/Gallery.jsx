import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import YouTube from 'react-youtube'; // Make sure you have this installed

function Gallery() {
  // Image Carousel Data
  const imageSlides = [
    {
      url: 'https://sportena.gr/wp-content/uploads/2023/03/aris_paok_prognostika_scorakias.jpg',
    },
    {
      url: 'https://www.sportime.gr/wp-content/uploads/2024/05/4276198.jpg',
    },
    {
      url: 'https://sportday.gr/images/2024/05/19/sportday_20240519220634_174847-960x640.jpg',
    },
    {
      url: 'https://www.cretapost.gr/wp-content/uploads/2024/05/paok_nea_mesa_190524.jpg',
    },
    {
      url: 'https://s2.aek365.org/uploads/articles/images/5/523cb19e30be6b19e61f87dfc3b80300_991707.jpg',
    },
    {
      url: 'https://s2.aek365.org/uploads/articles/images/a/ab39c12939f648bc717c31a94cb369f4_991707.jpg',
    },
    {
      url: 'https://www.newsit.gr/wp-content/uploads/2024/05/paok2-1-1200x800.jpg',
    },
    {
      url: 'https://www.slgr.gr/superleaguestorage/2024/5/2068_6226425.jpg',
    },
    {
      url: 'https://cdn.ethnos.gr/resources/images/2c6ef54a-ad6a-4e5e-a609-45fa16f1d443.jpg',
    },
    {
      url: 'https://www.athensvoice.gr/images/1074x600/jpg/sites/default/files/article/2019/04/22/2130951_1_1.jpg',
    },
    {
      url: 'https://primesport.gr/wp-content/uploads/2024/05/paok-badounas.jpg',
    },
  ];

  const videoSlides = [
    { id: '89ZDjVX2yq4' },
    { id: 'kvoUzHtx8yM' },
    { id: 'uAHVEJLd-8Y' },
  ];

  // Image Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImageSlide = () => {
    const isFirstSlide = currentImageIndex === 0;
    const newIndex = isFirstSlide
      ? imageSlides.length - 1
      : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const nextImageSlide = () => {
    const isLastSlide = currentImageIndex === imageSlides.length - 1;
    const newIndex = isLastSlide ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const goToImageSlide = (slideIndex) => {
    setCurrentImageIndex(slideIndex);
  };

  // Video Carousel State
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const prevVideoSlide = () => {
    const isFirstSlide = currentVideoIndex === 0;
    const newIndex = isFirstSlide
      ? videoSlides.length - 1
      : currentVideoIndex - 1;
    setCurrentVideoIndex(newIndex);
  };

  const nextVideoSlide = () => {
    const isLastSlide = currentVideoIndex === videoSlides.length - 1;
    const newIndex = isLastSlide ? 0 : currentVideoIndex + 1;
    setCurrentVideoIndex(newIndex);
  };

  const goToVideoSlide = (slideIndex) => {
    setCurrentVideoIndex(slideIndex);
  };

  return (
    <div className="max-w-[900px] m-auto p-4 pt-28 space-y-8">
      <h2 className="text-center text-3xl font-rubik">PAOK Hub Gallery</h2>

      {/* Video Carousel */}
      <div className="relative group">
        <div className="w-full pb-[56.25%] relative bg-black rounded-2xl overflow-hidden">
          <YouTube
            videoId={videoSlides[currentVideoIndex].id}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 0,
              },
            }}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/80 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevVideoSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/80 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextVideoSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {videoSlides.map((video, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToVideoSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${
                slideIndex === currentVideoIndex ? 'text-white' : 'text-gray-500'
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative group py-24">
        <div
          style={{
            backgroundImage: `url(${imageSlides[currentImageIndex].url})`,
          }}
          className="w-full pb-[56.25%] rounded-2xl bg-center bg-cover duration-500"
        ></div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/80 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevImageSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/80 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextImageSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {imageSlides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToImageSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${
                slideIndex === currentImageIndex ? 'text-white' : 'text-gray-500'
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
