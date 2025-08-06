import React from "react";
import styles from "./ContactUs.module.css";

import contactusimage from "../../assets/contactusImage.png"
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Contactus = () => {
    return (
        <div className={styles.contactWrapper}>
            {/* Banner */}
            <div className={styles.banner}>
                <img
                    src={contactusimage} // change to your actual image path
                    alt="Contact Us Banner"
                    className={styles.bannerImage}
                />
            </div>

            <div className={styles.contactContent}>
                {/* Left: Image */}
                <div className={styles.contactInfoWrapper}>
                    <h2 className={styles.contactHeading}>Contact Information</h2>
                    <p className={styles.contactDescription}>Any question or remarks? Just write us a message!</p>
                    <div className={styles.contactFlexContainer}>
                        <div className={styles.contactItem}>
                            <FiPhone className={styles.icon} />
                            <a href="tel:+911234567890">+91 12345 67890</a>
                        </div>

                        <div className={styles.contactItem}>
                            <FiMail className={styles.icon} />
                            <a href="mailto:info@example.com">info@example.com</a>
                        </div>

                        <div className={styles.contactItem}>
                            <FiMapPin className={styles.icon} />
                            <span>123, Main Street, Your City, India</span>
                        </div>
                    </div>
                </div>

                <div className={styles.formSection}>

                    <form className={styles.contactForm}
                    // onSubmit={handleSubmit}
                    >
                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label htmlFor="firstName">First Name<span className={styles.requiredTag}>(Required)</span></label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    // value={formData.fullName}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* <div className={styles.formGroup}>
                                <label htmlFor="phoneNumber">Phone Number<span className={styles.requiredTag}>(Required)</span></label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    // value={formData.phoneNumber}
                                    // onChange={handleChange}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    required
                                />
                            </div> */}
                            <div className={styles.formGroup}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    // value={formData.fullName}
                                    // onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email<span className={styles.requiredTag}>(Required)</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                // value={formData.email}
                                // onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phoneNumber">Phone Number<span className={styles.requiredTag}>(Required)</span></label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                // value={formData.phoneNumber}
                                // onChange={handleChange}
                                pattern="[0-9]*"
                                inputMode="numeric"
                                required
                            />
                        </div>

                        {/* <div className={styles.formGroup}>
                            <label htmlFor="category">Select Category<span className={styles.requiredTag}>(Required)</span></label>
                            <select
                                id="category"
                                name="category"
                                className={styles.selectField}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                required
                            >
                                <option value="">Select a Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div> */}

                        {/* <div className={styles.formGroup}>
                            <label htmlFor="product">Select Product</label>
                            <select
                                id="product"
                                name="product"
                                className={styles.selectField}
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                required
                            >
                                <option value="">Select a Product</option>
                                {products
                                    .filter((product) => product.category === selectedCategory)
                                    .map((product) => (
                                        <option key={product._id} value={product.productName}>
                                            {product.productName}
                                        </option>
                                    ))}
                            </select>
                        </div> */}

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                            // value={formData.message}
                            // onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className={styles.submitButton}>Submit Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contactus;
