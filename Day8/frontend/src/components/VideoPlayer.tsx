import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlayer({ src }: { src: string }) {
    const videoRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<ReturnType<typeof videojs> | null>(null);
  
    useEffect(() => {
      if (!videoRef.current || !src) return;
  
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
  
      while (videoRef.current.firstChild) {
        videoRef.current.removeChild(videoRef.current.firstChild);
      }
  
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);
  
      playerRef.current = videojs(videoElement, {
        controls: true,
        fluid: true,
        autoplay: false,
        preload: "auto",
        sources: [{ src, type: "video/mp4" }],
      });
  
      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }, [src]);
  
    return <div ref={videoRef} />;
  }

  export default VideoPlayer