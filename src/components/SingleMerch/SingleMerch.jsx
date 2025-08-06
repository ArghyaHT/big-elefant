import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SingleMerch.module.css"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Reviews from "../Reviews/Reviews";
import Plastic from "../Plastic/Plastic";
import WildMerchSection from "../Wild Merch/WildMerch";
import { FaHeart, FaRegHeart, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

const colors = {
    5: "#8EDD7E", // green
    4: "#E3AA2F", // light green
    3: "#44EBCA", // amber
    2: "#3A3DDB", // orange
    1: "#D52828", // red
};


const SingleMerch = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [rating, setRating] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);

    const [selectedSize, setSelectedSize] = useState("");

    const location = useLocation();
    const merch = location.state?.merch;



    const toggleFavorite = () => {
        setIsFavorited(prev => !prev);
    };

    // console.log("Received product:", merch);

    // Calculate counts of each star rating in merch.reviews
    const starCounts = [5, 4, 3, 2, 1].reduce((acc, star) => {
        acc[star] = merch.reviews.filter((r) => r === star).length;
        return acc;
    }, {});

    // Find max count to normalize widths (optional)
    const maxCount = Math.max(...Object.values(starCounts), 1); // avoid divide by zero


    return (
        <>
            <div className={styles.merchContainer}>
                {/* Left Section: Image */}
                <div className={styles.merchImageSection}>
                    <Swiper
                      className={styles.mySwiper}
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={true}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // realIndex ignores duplicated slides
                        spaceBetween={50}
                        slidesPerView={1}
                    >
                        {merch?.merchImages?.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    alt={`${merch?.name} - ${index}`}
                                    className={styles.merchImage}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right Section: Content */}
                <div className={styles.merchContentSection}>
                    <h1 className={styles.merchName}>{merch?.name}</h1>
                    <h3 className={styles.merchPrice}>
                        {merch?.currency}
                        {Number(merch?.price).toFixed(2)}
                    </h3>

                    <div className={styles.ratingSection}>
                        <div className={styles.stars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => {
                                        setRating(star);
                                        console.log("Selected Rating:", star);
                                    }} className={styles.starIcon}
                                >
                                    {rating >= star ? <FaStar color="gold" /> : <FaRegStar color="#ccc" />}
                                </span>
                            ))}
                        </div>
                    </div>


                    <div className={styles.selectSizeSection}>
                        <h2 className={styles.sectionHeading}>Select size</h2>
                        <div className={styles.sizeOptions}>
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`${styles.sizeButton} ${selectedSize === size ? styles.selectedSize : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedSize(size);
                                        console.log("Selected Size:", size);
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors section */}
                    <div className={styles.colorsSection}>
                        <h2 className={styles.sectionHeading}>Select Colour</h2>
                        <div className={styles.colorOptions}>
                            {/* Replace with actual color options */}
                            <span className={styles.colorDot} style={{ backgroundColor: 'black' }}></span>
                            <span className={styles.colorDot} style={{ backgroundColor: 'red' }}></span>
                            <span className={styles.colorDot} style={{ backgroundColor: 'green' }}></span>
                            <span className={styles.colorDot} style={{ backgroundColor: 'blue' }}></span>
                            <span className={styles.colorDot} style={{ backgroundColor: 'yellow' }}></span>
                            <span className={styles.colorDot} style={{ backgroundColor: 'pink' }}></span>
                        </div>
                    </div>

                    <div className={styles.buyNowWrapper}>
                        <button className={styles.buyNowSolidButton}>Buy Now</button>
                        <button className={styles.favIconButton} onClick={toggleFavorite}>
                            {isFavorited ? <FaHeart color="red" /> : <FaRegHeart />}
                        </button>
                    </div>


                    <div className={styles.merchDescriptionWrapper}>
                        <h2 className={styles.sectionHeading}>Description</h2>
                        <p className={styles.merchDescription}>
                            {merch?.description}
                        </p>

                        {/* Features List */}
                        {merch?.features?.length > 0 && (
                            <ul className={styles.featureList}>
                                {merch.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>

            <WildMerchSection />

            <div className={styles.reviewSectionWrapper}>
                <h2 className={styles.reviewSectionHeading}>Reviews</h2>

                <div className={styles.reviewSection}>
                    <div className={styles.reviewLeft}>
                        <h2 className={styles.subHeading}>Total Reviews</h2>
                        <h3 className={styles.reviewCount}>
                            {merch.reviews.length >= 1000
                                ? (merch.reviews.length / 1000).toFixed(1) + 'K'
                                : merch.reviews.length}
                        </h3>
                    </div>

                    <div className={styles.reviewMiddle}>
                        <h2 className={styles.subHeading}>Average Rating</h2>
                        <div className={styles.ratingRow}>
                            <h3 className={styles.averageRating}>
                                {(
                                    merch.reviews.reduce((sum, r) => sum + r, 0) / merch.reviews.length
                                ).toFixed(1)}
                            </h3>
                            <div className={styles.stars}>
                                {Array.from({ length: 5 }, (_, i) => {
                                    const avg =
                                        merch.reviews.reduce((sum, r) => sum + r, 0) / merch.reviews.length;

                                    const full = Math.floor(avg);
                                    const hasHalf = avg - full >= 0.25 && avg - full <= 0.75;

                                    if (i < full) {
                                        return <FaStar key={i} className={styles.starIcon} />;
                                    } else if (i === full && hasHalf) {
                                        return <FaStarHalfAlt key={i} className={styles.starIcon} />;
                                    } else {
                                        return <FaRegStar key={i} className={styles.starIcon} />;
                                    }

                                })}
                            </div>
                        </div>
                    </div>

                    <div className={styles.reviewRight}>
                        {[5, 4, 3, 2, 1].map((star) => (
                            <div className={styles.starRow} key={star}>
                                <span className={styles.starLabel}>
                                    {star} <FaStar className={styles.starIcon} />

                                </span>
                                <div className={styles.starBarContainer}
                                  style={{ width: `${(starCounts[star] / maxCount) * 100}%` }}>
                                    <div
                                        className={styles.starBar}
                                        style={{
                                            width: `${(starCounts[star] / maxCount) * 100}%`,
                                            backgroundColor: colors[star],
                                        }}
                                    />
                                </div>
                                  <span className={styles.starCount}>{starCounts[star]}</span>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default SingleMerch;