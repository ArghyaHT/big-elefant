import React from "react";
import styles from "./JoinElefantClub.module.css";
import logoImage from "../../assets/BigElefantLogo.png"; // your logo path
import { Link } from "react-router-dom";

const BigElefantClub = () => {
  return (
    <Link to="/elefant-club" className={styles.clubLink}>

      <section className={styles.clubSection}>
        <div className={styles.centerLogo}>
          <img src={logoImage} alt="BigElefant Club" className={styles.logo} />
        </div>

        <div className={styles.taglineWrapper}>
          <div className={styles.underline}></div>
          <p className={styles.tagline}>join the elefant’s club (Coming Soon)</p>
        </div>
      </section>
    </Link>

  );
};

export default BigElefantClub;