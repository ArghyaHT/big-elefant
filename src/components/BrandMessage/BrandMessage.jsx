import React from "react";
import styles from "./BrandMessage.module.css";

const BrandMessage = () => {
    return (
        <section className={styles.wrapper}>
                <h3 className={styles.brandMessage}>
                    Crush the plastic. Drink water with rage
                </h3>
        </section>
    );
};

export default BrandMessage;