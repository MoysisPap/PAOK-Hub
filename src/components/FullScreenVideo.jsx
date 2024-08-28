import { useState, useEffect } from 'react';
import largeVideoFile from '../assets/The Incredibles Movie-Teaser-Desktop.mp4';
import smallVideoFile from '../assets/The Incredibles Movie-Teaser-Reel.mp4'

function FullScreenVideo() {
  const [videoSrc, setVideoSrc] = useState(largeVideoFile);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1150) {
        setVideoSrc(smallVideoFile);
      } else {
        setVideoSrc(largeVideoFile);
      }
    };

    handleResize(); // Initial check when the component mounts
    window.addEventListener('resize', handleResize); // Listen for resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup the event listener
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
      />
    </div>
  );
}

export default FullScreenVideo;