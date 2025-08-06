import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SingleProduct.module.css"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Reviews from "../Reviews/Reviews";
import Plastic from "../Plastic/Plastic";
import WildMerchSection from "../Wild Merch/WildMerch";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const SingleProduct = () => {
    const dispatch = useDispatch();

    const [activeIndex, setActiveIndex] = useState(0);
    const [packSizeError, setPackSizeError] = useState("");


    const [selectedPackSize, setSelectedPackSize] = useState(null);


    const location = useLocation();
    const product = location.state?.product;

    useEffect(() => {
        console.log("Received product:", product);
    }, [product]);



    const handleAddToCart = () => {
        if (!selectedPackSize || (selectedPackSize !== 6 && selectedPackSize !== 12)) {
            setPackSizeError("Please select a valid pack size.");
            return;
        }

        setPackSizeError(""); // Clear error on valid selection


        const packSize = selectedPackSize;


        // Determine the correct price based on selected pack
        let packPrice = 0;
        if (selectedPackSize === 6) {
            packPrice = Number(product?.pricePack6);
        } else if (selectedPackSize === 12) {
            packPrice = Number(product?.pricePack12);
        }

        dispatch(
            addToCart({
                ...product,
                name: product.productName,
                category: product.category,
                id: `${product._id}-${packSize}`, // 🔑 Make ID unique by pack
                price: packPrice,
                packSize,
            })
        );
    };

    return (
        <>
            <div className={styles.productContainer}>
                {/* Left Section: Image */}
                <div className={styles.productImageSection}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        loop={true}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // realIndex ignores duplicated slides
                        spaceBetween={50}
                        slidesPerView={1}
                    >
                        {product?.productImages?.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    alt={`${product?.productName} - ${index}`}
                                    className={styles.productImage}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right Section: Content */}
                <div className={styles.productContentSection}>
                    <h1 className={styles.productName}>{product?.productName}</h1>
                    <h3 className={styles.productPrice}>
                        {product?.currency}
                        {Number(product?.pricePack6).toFixed(2)}
                    </h3>
                    <div className={styles.tags}>
                        {product.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className={styles.productDescriptionWrapper}>
                        <p className={styles.productDescription}>
                            {product?.longDescription}
                        </p>
                    </div>
                    <button className={styles.primaryButton}>{product.calories} Calories</button>

                    <div className={styles.selectSizeSection}>
                        <h2 className={styles.sectionHeading}>Select size</h2>

                        <div className={styles.packOptions}>
                            {[6, 12].map((packSize) => {
                                // Determine price based on pack size
                                const packPrice =
                                    packSize === 6
                                        ? product?.pricePack6
                                        : packSize === 12
                                            ? product?.pricePack12
                                            : null;
                                return (
                                    <div
                                        key={packSize}
                                        className={`${styles.packOption} ${selectedPackSize === packSize ? styles.selectedPack : ""
                                            }`}
                                        onClick={() => {
                                            if (selectedPackSize === packSize) {
                                                setSelectedPackSize(0); // Deselect if clicked again
                                            } else {
                                                setSelectedPackSize(packSize);
                                            }
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <h4 className={styles.packLabel}>Pack of {packSize}</h4>
                                        <p className={styles.packPrice}>
                                            {product?.currency}
                                            {packPrice?.toFixed(2)}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.buyNowWrapper}>
                        <button className={styles.buyNowSolidButton} onClick={handleAddToCart}>Buy Now</button>
                    </div>
                    {packSizeError && <p className={styles.errorMessage}>{packSizeError}</p>}
                </div>
            </div>
            <Reviews />


            <div className={styles.attitudeSection}>
                <div className={styles.twoColumnSection}>
                    <div className={styles.leftContent}>
                        <h3 className={styles.attitudeTagline}>
                            Chill out — it’s just water with attitude
                        </h3>
                        <p className={styles.attitudeDesc}>Tap water in disguise? Not here. Big Elefant is born in the wild — from legit mountain springs deep in America’s fiercest ranges.</p>
                    </div>

                    <div className={styles.rightVideo}>
                        <video
                            src="/path-to-your-video.mp4"
                            controls
                            className={styles.videoPlayer}
                        />
                    </div>
                </div>
            </div>

            <Plastic />
            <WildMerchSection />

        </>
    );
};

export default SingleProduct;