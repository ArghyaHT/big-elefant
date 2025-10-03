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
import { useDispatch } from "react-redux";
import { addMerchToCart } from "../../redux/merchCartSlice";
import { toggleCart } from "../../redux/uiSlice";
import { useEffect } from "react";
import SingleProductReview from "../SingleProductReview/SingleProductReview";


const SingleMerch = () => {
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const [rating, setRating] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    const location = useLocation();
    const merch = location.state?.merch;

    console.log("SingleMerch received:", merch); // <-- log the product here


    // Automatically select first color and size on merch load
    useEffect(() => {
        if (merch?.variants?.length > 0) {
            const firstVariant = merch.variants[0];
            setSelectedColor(firstVariant.merchColor.hex);

            const firstSize = getSizesFromVariant(firstVariant)[0]?.sizeName || "";
            setSelectedSize(firstSize);
        }
    }, [merch]);

    // Helper: get sizes for a variant based on productType
    const getSizesFromVariant = (variant) => {
        switch (variant.productType) {
            case "Cloth":
                return variant.clothSizes || [];
            case "Bottle":
            case "Mug":
                return variant.bottleSizes || [];
            case "Bag":
                return variant.bagSizes || [];
            default:
                return [];
        }
    };

    // Get sizes based on currently selected color
    const getSizesForSelectedColor = () => {
        const variant = merch.variants.find(v => v.merchColor.hex === selectedColor);
        return variant ? getSizesFromVariant(variant) : [];
    };

    // Update selected size when color changes
    useEffect(() => {
        const sizes = getSizesForSelectedColor();
        if (sizes.length > 0) setSelectedSize(sizes[0].sizeName);
    }, [selectedColor]);

    // const toggleFavorite = () => {
    //     setIsFavorited(prev => !prev);
    // };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        if (!selectedColor) {
            alert("Please select a color");
            return;
        }
        const cartItem = {
            ...merch,
            id: `${merch._id}-${selectedSize}-${selectedColor}`, // unique cart ID
            selectedSize,         // add chosen size
            selectedColor,
            id: `${merch._id}-${selectedSize}`, // 🔑 Make ID unique by pack
        };

        dispatch(addMerchToCart(cartItem));
        dispatch(toggleCart());         // Open the cart screen


    };

    // // Calculate counts of each star rating in merch.reviews
    // const starCounts = [5, 4, 3, 2, 1].reduce((acc, star) => {
    //     acc[star] = merch.reviews.filter((r) => r === star).length;
    //     return acc;
    // }, {});


    // Find max count to normalize widths (optional)
    // const maxCount = Math.max(...Object.values(starCounts), 1); // avoid divide by zero


    return (
        <>
            <div className={styles.merchContainer}>
                {/* Left Section: Image */}
                <div className={styles.merchImageSection}>
                    <Swiper
                        className={styles.mySwiper}
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={true}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // realIndex ignores duplicated slides
                        spaceBetween={50}
                        slidesPerView={1}
                    >
                        {merch.variants
                            .find((v) => v.merchColor.hex === selectedColor)
                            ?.merchImages.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img}
                                        alt={`${merch?.merchName} - ${index}`}
                                        className={styles.merchImage}
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>

                {/* Right Section: Content */}
                <div className={styles.merchContentSection}>
                    <h1 className={styles.merchName}>{merch?.merchName}</h1>
                    <h3 className={styles.merchPrice}>
                        {merch?.currency}
                        {(() => {
                            const variant = merch.variants.find(v => v.merchColor.hex === selectedColor);
                            if (!variant) return "0.00";

                            let sizeObj;
                            if (variant.clothSizes?.length > 0) {
                                sizeObj = variant.clothSizes.find(s => s.sizeName === selectedSize);
                            } else if (variant.bottleSizes?.length > 0) {
                                sizeObj = variant.bottleSizes.find(s => s.sizeName === selectedSize);
                            } else if (variant.bagSizes?.length > 0) {
                                sizeObj = variant.bagSizes.find(s => s.sizeName === selectedSize);
                            }

                            return sizeObj ? Number(sizeObj.price).toFixed(2) : "0.00";
                        })()}

                        <span className={styles.mrp}>
                            {merch?.currency}
                            {(() => {
                                const variant = merch.variants.find(v => v.merchColor.hex === selectedColor);
                                if (!variant) return "0.00";

                                let sizeObj;
                                if (variant.clothSizes?.length > 0) {
                                    sizeObj = variant.clothSizes.find(s => s.sizeName === selectedSize);
                                } else if (variant.bottleSizes?.length > 0) {
                                    sizeObj = variant.bottleSizes.find(s => s.sizeName === selectedSize);
                                } else if (variant.bagSizes?.length > 0) {
                                    sizeObj = variant.bagSizes.find(s => s.sizeName === selectedSize);
                                }

                                return sizeObj ? Number(sizeObj.mrp).toFixed(2) : "0.00";
                            })()}
                        </span>

                        <span className={styles.discount}>
                            {(() => {
                                const variant = merch.variants.find(v => v.merchColor.hex === selectedColor);
                                if (!variant) return null;

                                let sizeObj;
                                if (variant.clothSizes?.length > 0) {
                                    sizeObj = variant.clothSizes.find(s => s.sizeName === selectedSize);
                                } else if (variant.bottleSizes?.length > 0) {
                                    sizeObj = variant.bottleSizes.find(s => s.sizeName === selectedSize);
                                } else if (variant.bagSizes?.length > 0) {
                                    sizeObj = variant.bagSizes.find(s => s.sizeName === selectedSize);
                                }

                                if (!sizeObj) return null;

                                const price = sizeObj.price;
                                const mrp = sizeObj.mrp;

                                if (!price || !mrp || mrp <= price) return null;

                                const discountPercent = Math.round(((mrp - price) / mrp) * 100);

                                return (
                                    <span className={styles.discountContent}>
                                        {discountPercent}% off
                                    </span>
                                );
                            })()}
                        </span>
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


                    {/* <div className={styles.selectSizeSection}>
                        <h2 className={styles.sectionHeading}>Select size</h2>
                        <div className={styles.sizeOptions}>
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`${styles.sizeButton} ${selectedSize === size ? styles.selectedSize : styles.normalSize
                                        }`}
                                    onClick={() => {
                                        setSelectedSize(size);
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div> */}

                    {/* Size selection */}
                    <div className={styles.selectSizeSection}>
                        <h2 className={styles.sectionHeading}>Select size</h2>
                        <div className={styles.sizeOptions}>
                            {getSizesForSelectedColor().map((sizeObj) => (
                                <button
                                    key={sizeObj.sizeName}
                                    className={`${styles.sizeButton} ${selectedSize === sizeObj.sizeName ? styles.selectedSize : styles.normalSize
                                        }`}
                                    onClick={() => setSelectedSize(sizeObj.sizeName)}
                                >
                                    {sizeObj.sizeName}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div className={styles.colorsWrapper}>
                        <h4>Select Color</h4>
                        <div className={styles.colorOptions}>
                            {merch.variants.map((variant, index) => (
                                <span
                                    key={variant.merchColor.hex + index} // unique key
                                    className={`${styles.colorDot} ${selectedColor === variant.merchColor.hex ? styles.selectedColor : ""}`}
                                    style={{
                                        backgroundColor: variant.merchColor.hex,
                                        border: selectedColor === variant.merchColor.hex ? '3px solid #d4a13b' : '',
                                        boxSizing: 'border-box', // ensures border doesn't shift layout
                                        cursor: 'pointer',
                                    }} onClick={() => setSelectedColor(variant.merchColor.hex)}
                                    title={variant.productType} // optional: show product type on hover
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.buyNowWrapper}>
                        <button className={styles.buyNowSolidButton} onClick={handleAddToCart}>Add To Cart</button>
                        {/* <button className={styles.favIconButton} onClick={toggleFavorite}>
                            {isFavorited ? <FaHeart color="red" /> : <FaRegHeart color="black" />}
                        </button> */}
                    </div>


                    <div className={styles.merchDescriptionWrapper}>
                        <h2 className={styles.sectionHeading}>Description</h2>
                        <p className={styles.merchDescription}>
                            {merch?.description}
                        </p>

                        {/* Features List */}
                        {merch?.merchFeatures?.length > 0 && (
                            <ul className={styles.featureList}>
                                {merch.merchFeatures.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>

            {/* <div className={styles.reviewSectionWrapper}>
                <h2 className={styles.reviewSectionHeading}>Reviews</h2>

                <div className={styles.reviewSection}> */}
            {/* <div className={styles.reviewLeft}>
                        <h2 className={styles.subHeading}>Total Reviews</h2>
                        <h3 className={styles.reviewCount}>
                            {merch.reviews.length >= 1000
                                ? (merch.reviews.length / 1000).toFixed(1) + 'K'
                                : merch.reviews.length}
                        </h3>
                    </div> */}

            {/* <div className={styles.reviewMiddle}>
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
                    </div> */}

            {/* <div className={styles.reviewRight}>
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
                    </div> */}
            {/* </div>
            </div> */}

            <SingleProductReview product={merch} />


            <div className={styles.attitudeSection}>
                {/* <div className={styles.twoColumnSection}> */}
                <div className={styles.leftContent}>
                    <h3 className={styles.attitudeTagline}>
                        Chill out — it’s just water with attitude
                    </h3>
                    <p className={styles.attitudeDesc}>Beyond boring bottles—can life is here. Save your aura, save the environment.</p>
                </div>
            </div>
            <Plastic />

            <WildMerchSection />



        </>
    );
};

export default SingleMerch;