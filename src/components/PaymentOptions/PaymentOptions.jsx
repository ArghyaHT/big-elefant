// components/PaymentOptionHeading.jsx
import React from "react";
import styles from "./PaymentOptions.module.css"; // or adjust path
import { IoChevronDownOutline } from "react-icons/io5";

const PaymentOptions = ({ title, isExpanded }) => {
  return (
    <div className={styles.paymentHeading}>
      <h3>{title}</h3>
    <IoChevronDownOutline
        className={`${styles.arrow} ${isExpanded ? styles.arrowExpanded : ""}`}
      />
          </div>
  );
};

export default PaymentOptions;
