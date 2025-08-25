import React from "react";
import styles from "./BrandMessage.module.css";

const BrandMessage = () => {
    return (
        <section className={styles.wrapper}>
                <h3 className={styles.brandMessage}>
                    Don’t just follow trends. Hold them.
                </h3>
        </section>
    );
};

export default BrandMessage;