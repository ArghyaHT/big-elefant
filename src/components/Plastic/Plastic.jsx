import React from "react";
import styles from "./Plastic.module.css";
import badge from "../../assets/badge.png"
import { Link } from "react-router-dom";

const Plastic = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.overlay}>
                <div className={styles.logoContainer}>
                    <div className={styles.logoBadge}>
                        <img src={badge} alt="Aura Badge" className={styles.badgeImage} />
                        <div className={styles.badgeText}>
                            <p>Elefant</p>
                            <p>crushes</p>
                            <p>Plastic</p>
                        </div>
                    </div>
                </div>

                <p className={styles.description}>
                    Recycling plastic? Kinda sus. Most time it just gets turns into trash that still ends up in the landfill. Aluminum, though?. You can recycle it forever.
                </p>
                <div className={styles.ctaWrapper}>
                    <Link to="/death-to-plastic" className={styles.ctaButton}>
                        Read More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Plastic;
