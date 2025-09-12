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
import { FaArrowDown } from "react-icons/fa";
import SingleProductReview from "../SingleProductReview/SingleProductReview";
import { toggleCart } from "../../redux/uiSlice";

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
        if (!selectedPackSize || (selectedPackSize !== 4 && selectedPackSize !== 6 && selectedPackSize !== 12)) {
            setPackSizeError("Please select a valid pack size.");
            return;
        }

        setPackSizeError(""); // Clear error on valid selection


        const packSize = selectedPackSize;


        // Determine the correct price based on selected pack
        let packPrice = 0;
        if (selectedPackSize === 4) {
            packPrice = Number(product?.pricePack4);
        } else if (selectedPackSize === 6) {
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

    dispatch(toggleCart());         // Open the cart screen

    };

    return (
        <>
            <div className={styles.productContainer}>
                {/* Left Section: Image */}
                <div className={styles.productImageSection}>
                    <Swiper
                        modules={[Pagination, Autoplay]}
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
                    <h4 className={styles.productPrice}>
                        {product?.currency}
                        {(
                            selectedPackSize === 4
                                ? product?.pricePack4
                                : selectedPackSize === 6
                                    ? product?.pricePack6
                                    : selectedPackSize === 12
                                        ? product?.pricePack12
                                        : product?.pricePack4 // default fallback
                        )?.toFixed(2)}

                        <span className={styles.mrp}>
                            {product?.currency}
                            {(
                                selectedPackSize === 4
                                    ? product?.mrpOf4
                                    : selectedPackSize === 6
                                        ? product?.mrpOf6
                                        : selectedPackSize === 12
                                            ? product?.mrpOf12
                                            : product?.mrpOf4
                            )?.toFixed(2)}
                        </span>

                        {/* Discount Percentage */}
                        <span className={styles.discount}>
                            &nbsp;
                            {(() => {
                                const price =
                                    selectedPackSize === 4
                                        ? product?.pricePack4
                                        : selectedPackSize === 6
                                            ? product?.pricePack6
                                            : selectedPackSize === 12
                                                ? product?.pricePack12
                                                : product?.pricePack4;

                                const mrp =
                                    selectedPackSize === 4
                                        ? product?.mrpOf4
                                        : selectedPackSize === 6
                                            ? product?.mrpOf6
                                            : selectedPackSize === 12
                                                ? product?.mrpOf12
                                                : product?.mrpOf4;

                                if (!price || !mrp || mrp <= price) return null;

                                const discountPercent = Math.round(((mrp - price) / mrp) * 100);
                                return (
                                    <span className={styles.discountContent}>
                                        {/* <FaArrowDown style={{ marginRight: '4px' }} /> */}
                                        {discountPercent}% off
                                    </span>
                                );
                            })()}
                        </span>
                    </h4>
                    {/* <div className={styles.tags}>
                        {product.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div> */}

                    <div className={styles.productDescriptionWrapper}>
                        <p className={styles.productDescription}>
                            {product?.longDescription}
                        </p>

                        {/* Features List */}
                        {product?.tags?.length > 0 && (
                            <ul className={styles.featureList}>
                                {product.tags.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button className={styles.primaryButton}>{product.calories} Calories</button>

                    <div className={styles.selectSizeSection}>
                        <h2 className={styles.sectionHeading}>Select size</h2>

                        <div className={styles.packOptions}>
                            {[4, 6, 12].map((packSize) => {
                                const packPrice =
                                    packSize === 4
                                        ? product?.pricePack4
                                        : packSize === 6
                                            ? product?.pricePack6
                                            : packSize === 12
                                                ? product?.pricePack12
                                                : null;

                                const packStock =
                                    packSize === 4
                                        ? product?.stockpack4
                                        : packSize === 6
                                            ? product?.stockpack6
                                            : packSize === 12
                                                ? product?.stockpack12
                                                : 0;

                                const isSelected = selectedPackSize === packSize;
                                const isOutOfStock = packStock === 0;

                                // ✅ Add this here
                                const unitVolume = 0.5; // e.g., 0.5L per unit
                                const totalVolume = (packSize * unitVolume).toFixed(1); // e.g., 6 * 0.5 = 3.0L

                                return (
                                    <div
                                        key={packSize}
                                        className={`
          ${styles.packOption}
          ${isSelected ? styles.selectedPack : ""}
          ${isOutOfStock ? styles.outOfStock : ""}
        `}
                                        onClick={() => {
                                            if (isOutOfStock) return;
                                            setSelectedPackSize(isSelected ? 0 : packSize);
                                        }}
                                        style={{ cursor: isOutOfStock ? "not-allowed" : "pointer" }}
                                    >
                                        <h4 className={styles.packLabel}>Pack of {packSize} ({totalVolume}L)</h4>
                                        <p className={styles.packPrice}>
                                            {isOutOfStock
                                                ? "Out of Stock"
                                                : `${product?.currency}${packPrice?.toFixed(2)}`}
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
            <SingleProductReview product={product} />


            <div className={styles.attitudeSection}>
                {/* <div className={styles.twoColumnSection}> */}
                    <div className={styles.leftContent}>
                        <h3 className={styles.attitudeTagline}>
                            Chill out — it’s just water with attitude
                        </h3>
                        <p className={styles.attitudeDesc}>Beyond boring bottles—can life is here. Save your aura, save the environment.</p>
                    </div>

                    {/* <div className={styles.rightVideo}>
                        <iframe
                            className={styles.videoPlayer}
                            src="https://www.youtube.com/embed/UEZm0U6KrfY"
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div> */}
                {/* </div> */}
            </div>

            <Plastic />
            <WildMerchSection />

        </>
    );
};

export default SingleProduct;
