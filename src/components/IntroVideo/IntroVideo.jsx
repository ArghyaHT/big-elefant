import React, { useState, useEffect } from "react";
import styles from "./IntroVideo.module.css";

const IntroVideo = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 🚀 If not desktop → don't render anything
  if (!isDesktop) return null;

  const handleEnd = () => {
    setFadeOut(true);
    setTimeout(() => {
      onFinish();
    }, 800);
  };

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : ""}`}>
      <video
        src="/Video.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnd}
        className={styles.video}
      />
    </div>
  );
};

export default IntroVideo;