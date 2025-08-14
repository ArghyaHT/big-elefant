import React, { useEffect, useState } from "react";
import styles from "../HomeProductDetail/HomeProductDetail.module.css";
import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"
import sparklingWater from "../../assets/sparkling-water.png"
import drinnkingWater from "../../assets/drinking-water.png"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { sanityClient } from "../../utils/sanityClient";



const HomeProductDetail = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            const query = `
   *[_type == "beverages" && isFeatured == true]{
          _id,
          productName,
          slug,
          bannerTitle,
          shortDescription,
          longDescription,
          productFeatures,
          "productImage": productImage.asset->url,
          "background": bannerBackground.asset->url,
          backgroundColor,
          calories,
          tags,
          currency,
          mrpOf4,
          mrpOf6,
          mrpOf12,
          pricePack4,
          pricePack6,
          pricePack12,
          stockpack4,
          stockpack6,
          stockpack12,
          deliveryChargespack4,
          deliveryChargespack6,
          deliveryChargespack12,
          "productImages": productImages[].asset->url,
          reviews[]{
            reviewerName,
            rating,
            reviewText
          }
        }
              `;
            try {
                const data = await sanityClient.fetch(query);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching featured products:", error);
            }
        };

        fetchFeaturedProducts();
    }, []);


    //   const handleShopNow = (product) => {
    //     navigate(`/single-product-page/${product._id}`, { state: { product } });
    // };
    const handleShopNow = (product) => {
        if (product.slug?.current) {
            navigate(`/single-product-page/${product.slug.current}`, { state: { product } });
        } else {
            console.warn("Missing slug for product:", product.productName);
        }
    };


    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 480);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <Swiper
            modules={[Navigation]}
            navigation
            pagination={{ clickable: true }}
            // autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
            {products.map((product) => (
                <SwiperSlide key={product._id}>
                    <section
                        className={styles.wrapper}
                        style={{
                            backgroundImage: `radial-gradient(circle at center, ${"#8F8F8F"} 0%, ${product.backgroundColor.hex} 100%)`,

                        }}
                    >
                        <div className={styles.overlay}>
                            <div className={styles.container}>
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={product.productImage}
                                        alt={product.productName}
                                        className={styles.image}
                                    />
                                </div>
                                <div className={styles.details}>
                                    <h1 className={styles.productName}>{product.productName}</h1>
                                    <div className={styles.tags}>
                                        {product.tags.map((tag, index) => (
                                            <span key={index} className={styles.tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className={styles.description}>{product.shortDescription}</p>
                                    <div className={styles.actions}>
                                        <button className={styles.primaryButton}>{product.calories} Calories</button>
                                        <button className={styles.secondaryButton}
                                            onClick={() => handleShopNow(product)}
                                        >Shop Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default HomeProductDetail;
