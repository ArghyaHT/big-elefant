import React from 'react';
import styles from './ElefantClub.module.css';
import beveragesBanner from "../../assets/el2.webp"

const ElefantClub = () => {
  return (
    <div className={styles.bannerContainer}>
      <img
        className={styles.bannerImage}
        src={beveragesBanner}
        alt="Elefant Club Banner"
      />

      {/* Color + Blur Layer */}
      <div className={styles.blurOverlay}></div>

      {/* Text or Button */}
      <div className={styles.overlay}>
        <h1 className={styles.overlayText}>Coming Soon</h1>
      </div>
    </div>
  );
};

export default ElefantClub;
