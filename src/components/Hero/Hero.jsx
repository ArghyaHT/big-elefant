import React, { useEffect, useState } from "react";
import styles from "../Hero/Hero.module.css"
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

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

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

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const handleShopNow = (product) => {
        if (product.slug?.current) {
            navigate(`/single-product-page/${product.slug.current}`, { state: { product } });
        } else {
            console.warn("Missing slug for product:", product.productName);
        }
    };
    return (
        <div
            className={styles.heroWrapper}
            style={{
                backgroundImage: products[activeIndex]?.background
                    ? `url(${products[activeIndex].background})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {products.length > 0 && (
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={!isMobile} // disable on mobile
                    // pagination={{ clickable: true }}
                    // autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // realIndex ignores duplicated slides
                    spaceBetween={50}
                    slidesPerView={1}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className={styles.slideContent}>
                                <div className={styles.textContent}>
                                    <h1 className={styles.title}>{product.bannerTitle}</h1>
                                    {/* <button className={styles.ctaButton}>Shop Now</button> */}
                                    {!isMobile && (
                                        <button
                                            className={styles.ctaButton}
                                            onClick={() => handleShopNow(product)}
                                        >
                                            Shop Now
                                        </button>
                                    )}
                                </div>
                                <img
                                    src={product.productImage}
                                    alt={product.bannerTitle}
                                    className={styles.image}
                                />

                                {isMobile && (
                                    <button
                                        className={styles.ctaButton}
                                        onClick={() => handleShopNow(product)}
                                    >
                                        Shop Now
                                    </button>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}

export default Hero