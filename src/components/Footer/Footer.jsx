import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/BigElefantGolden.png"; // Replace with your actual logo path
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbArrowForwardUp } from "react-icons/tb";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.gridContainer}>
                {/* Column 1: Logo & Description */}
                <div className={styles.logoSection}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                    <p className={styles.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </p>
                </div>

                {/* Column 2: Navigation Links */}
                <div className={styles.linksSection}>
                    <h4 className={styles.linksHeading}>Information</h4>
                    <div className={styles.linksListWrapper}>
                        <ul>
                            <li>
                                <Link to="/about-us" className={styles.links}>About Us</Link>
                            </li>
                            <li><Link to="/elefant-club" className={styles.links}>ELEFANT’S CLUB- Coming soon</Link></li>
                            {/* <li><a href="/">FAQ</a></li> */}
                            <li>
                                <Link to="/faq" className={styles.links}>FAQ</Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className={styles.links}>Contact Us</Link>
                            </li>
                            <li><Link to="/terms-and-conditions" className={styles.links}>Terms & Conditions</Link></li>
                            <li><Link to="/privacy-policy" className={styles.links}>Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Column 3: Social Media */}
                <div className={styles.socialSection}>
                    <h4 className={styles.socialHeading}>where can you find us</h4>
                    <div className={styles.socialIcons}>
                        <div className={styles.socialItem}>
                            <div className={styles.socialLink}>
                                <FaInstagram className={styles.icon} />
                                <span className={styles.followerCount}>6.1M</span>
                            </div>
                            <div className={styles.socialHandle}>@tba</div>
                        </div>
                        <div className={styles.socialItem}>
                            <div className={styles.socialLink}>
                                <FaXTwitter className={styles.icon} />
                                <span className={styles.followerCount}>120K</span>
                            </div>
                            <div className={styles.socialHandle}>@tba</div>
                        </div>
                    </div>

                    {/* Subscribe Section */}
                    <div className={styles.subscribeSection}>
                        <h3 className={styles.subscribeTitle}>Stay Updated</h3>
                        <form className={styles.subscribeForm}>
                            <input
                                type="email"
                                className={styles.subscribeInput}
                                placeholder="Enter your email"
                                required
                            />
                            <button type="submit" className={styles.subscribeButton}>
                                <TbArrowForwardUp size={22} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
