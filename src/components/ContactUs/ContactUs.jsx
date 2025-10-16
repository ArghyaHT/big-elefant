import React from "react";
import styles from "./ContactUs.module.css";

import contactusimage from "../../assets/contactusImage.png"
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from "react";
import { sanityClient } from "../../utils/sanityClient";

const Contactus = () => {
    // Form state
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    // Handle input changes (text inputs)
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Handle phone input separately because it returns just the phone string
    const handlePhoneChange = (phone) => {
        setFormData(prev => ({
            ...prev,
            phoneNumber: phone
        }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.phoneNumber) {
            setError("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        // Prepare the lead document to send to Sanity
        const leadDocument = {
            _type: "lead",
            fullName: formData.fullName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            message: formData.message,
            submittedAt: new Date().toISOString(),
        };

        try {
            await sanityClient.create(leadDocument);

            setSuccess("Thank you! Your message has been sent.");
            setFormData({
                fullName: "",
                email: "",
                phoneNumber: "91",
                message: ""
            });
        } catch (err) {
            console.error("Failed to submit lead:", err);
            setError("Failed to send your message. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={styles.contactWrapper}>
            {/* Banner */}
            {/* <div className={styles.banner}>
                <img
                    src={contactusimage} // change to your actual image path
                    alt="Contact Us Banner"
                    className={styles.bannerImage}
                />
            </div> */}

            <div className={styles.contactContent}>
                {/* Left: Image */}
                <div className={styles.contactInfoWrapper}>
                    <h2 className={styles.contactHeading}>Contact Information</h2>
                    <p className={styles.contactDescription}>Any question or remarks? Just write us a message!</p>
                    <div className={styles.contactFlexContainer}>
                        {/* <div className={styles.contactItem}>
                            <FiPhone className={styles.icon} />
                            <a href="tel:+911234567890">+91 12345 67890</a>
                        </div> */}

                        <div className={styles.contactItem}>
                            <FiMail className={styles.icon} />
                            <a href="mailto:bigelefantindia@gmail.com">bigelefantindia@gmail.com</a>
                        </div>

                        {/* <div className={styles.contactItem}>
                            <FiMapPin className={styles.icon} />
                            <span>123, Main Street, Your City, India</span>
                        </div> */}
                    </div>
                </div>

                <div className={styles.formSection}>
                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label htmlFor="fullName">
                                    Full Name<span className={styles.requiredTag}>(Required)</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* <div className={styles.formGroup}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div> */}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">
                                Email<span className={styles.requiredTag}>(Required)</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phoneNumber">
                                Phone Number<span className={styles.requiredTag}>(Required)</span>
                            </label>
                            <PhoneInput
                                country={'in'}
                                inputProps={{
                                    name: 'phoneNumber',
                                    required: true,
                                    id: 'phoneNumber',
                                }}
                                enableSearch
                                countryCodeEditable={false}
                                inputStyle={{ width: "100%" }}
                                value={formData.phoneNumber}
                                onChange={handlePhoneChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {success && <p style={{ color: "green" }}>{success}</p>}

                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? "Submitting..." : "Submit Now"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contactus;
