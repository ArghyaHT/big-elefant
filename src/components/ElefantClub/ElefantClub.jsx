import React from 'react';
import styles from './ElefantClub.module.css';
import beveragesBanner from "../../assets/el2.png"


const ElefantClub = () => {
  return (
    <div className={styles.bannerContainer}>
      <img
        className={styles.bannerImage}
        src={beveragesBanner}// update with your actual image path
        alt="Elefant Club Banner"
      />
    </div>
  );
};

export default ElefantClub;
