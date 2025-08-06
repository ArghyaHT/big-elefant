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
import { sanityClient } from "../../../../server/big-elefant/utils/sanityClient";

// const products = [
//     {
//         id: 1,
//         productName: "still drinking water",
//         title: "my husband AURA POINTs when you hold our can",
//         shortDescription: "We’re delivering pure still mountain water in cans that are 100% endlessly recyclable. Environmentally friendly? Without a doubt. Sourced from pristine mountain peaks to keep you refreshed—while caring for the planet. Clean, crisp, and conscious. That’s the vibe.",
//         description: "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable. Eco-conscious? Absolutely. Sourced from the freshest peaks, so you stay hydrated and keep the planet thriving. It’s a raging vibe.",
//         features: "Still Drinking Water, Infinitely Recyclable Cans",
//         writer: "Kelly",
//         productImage: drinnkingWater,
//         background: banner1,
//         backgroundColor: "#5D6984",
//         tags: ["Mountain Water", "Bold Taste", "Eco-Friendly", "Eternally Recyclable Cans"],
//         price: 35,
//         currency: "$",
//         productImages: [drinnkingWater, sparklingWater],
//         category: "Water",               // Added category here

//     },
//     {
//         id: 2,
//         productName: "SPARKLING water",
//         title: "You won't believe it’s not soda.",
//         shortDescription: "Our crisp mountain-sourced sparkling water comes in endlessly recyclable cans—because refreshment should never come at the planet’s expense. Effervescent, eco-conscious, and seriously satisfying. It’s hydration with a fizz and a mission.",
//         description: "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable. Eco-conscious? Absolutely. Sourced from the freshest peaks, so you stay hydrated and keep the planet thriving. It’s a raging vibe.",
//         features: "Sparkling Water, No Artificial Sweeteners",
//         writer: "Kelly",
//         productImage: sparklingWater,
//         background: banner2,
//         backgroundColor: "#5D8469",
//         tags: ["Mountain Water", "Bold Taste", "Eco-Friendly", "Eternally Recyclable Cans"],
//         price: 50,
//         currency: "$",
//         productImages: [sparklingWater, drinnkingWater],
//         category: "Water",               // Added category here

//     },
// ];



const HomeProductDetail = () => {
    const [activeIndex, setActiveIndex] = useState(0);
         const [isMobile, setIsMobile] = useState(false);
             const [products, setProducts] = useState([]);
         
        const navigate = useNavigate();

            useEffect(() => {
                const fetchFeaturedProducts = async () => {
                    const query = `
                *[_type == "beverages"]{
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
                  pricePack6,
                  pricePack12,
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
