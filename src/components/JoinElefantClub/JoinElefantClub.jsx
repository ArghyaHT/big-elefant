import React from "react";
import styles from "./JoinElefantClub.module.css";
import logoImage from "../../assets/BigElefantLogo.png"; // your logo path

const BigElefantClub = () => {
  return (
    <section className={styles.clubSection}>
      <div className={styles.centerLogo}>
        <img src={logoImage} alt="BigElefant Club" className={styles.logo} />
      </div>

      <div className={styles.taglineWrapper}>
        <div className={styles.underline}></div>
        <p className={styles.tagline}>join the elefant’s club (Coming Soon)</p>
      </div>
    </section>
  );
};

export default BigElefantClub;