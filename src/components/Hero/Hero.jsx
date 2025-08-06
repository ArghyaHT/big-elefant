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
//         tags: ["Sparkling Water", "Bold Taste", "Eco-Friendly", "Eternally Recyclable Cans"],
//         price: 50,
//         currency: "$",
//         productImages: [sparklingWater, drinnkingWater],
//         category: "Water",               // Added category here

//     },
// ];



const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

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

    // const handleShopNow = (product) => {
    //     navigate(`/single-product-page/${product.id}`, { state: { product } });
    // };

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
                navigation
                // pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                                <button
                                    className={styles.ctaButton}
                                    onClick={() => handleShopNow(product)}
                                >
                                    Shop Now
                                </button>
                            </div>
                            <img
                                src={product.productImage}
                                alt={product.bannerTitle}
                                className={styles.image}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            )}
        </div>
    );
}

export default Hero