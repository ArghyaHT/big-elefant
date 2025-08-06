import React, { useEffect, useState } from "react";
import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"
import sparklingWater from "../../assets/sparkling-water.png"
import drinnkingWater from "../../assets/drinking-water.png"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import aboutImage from "../../assets/aboutImage.png"
import styles from "../Aboutus/Aboutus.module.css"

import partner1 from "../../assets/partner1.png"
import partner2 from "../../assets/partner2.png"
import partner3 from "../../assets/partner3.png"
import partner4 from "../../assets/partner4.png"
import partner5 from "../../assets/partner5.png"
import partner6 from "../../assets/partner6.png"
import partner7 from "../../assets/partner7.png"
import Marquee from "react-fast-marquee";
import Reviews from "../Reviews/Reviews";
import { Link, useNavigate } from "react-router-dom";
import { sanityClient } from "../../utils/sanityClient";



// // Dummy product data
// const products = [
//     {
//         id: 1,
//         productName: "mountain water",
//         title: "my husband AURA POINTs when you hold our can",
//         writer: "Kelly",
//         features: "Still Drinking Water, Infinitely Recyclable Cans",
//         productImage: drinnkingWater,
//         background: banner1,
//         price: 35,
//         productDescription: "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable. Eco-conscious? Absolutely. Sourced from the freshest peaks, so you stay hydrated and keep the planet thriving. It’s a raging vibe.",
//         currency: "$",
//         productImages: [drinnkingWater, sparklingWater]
//     },
//     {
//         id: 2,
//         productName: "Soda-flavored sparkling water",
//         title: "You won't believe it’s not soda.",
//         description: "Second product description goes here.",
//         features: "Sparkling Water, No Artificial Sweeteners",
//         writer: "Kelly",
//         productImage: sparklingWater,
//         background: banner2,
//         price: 50,
//         productDescription: "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable. Eco-conscious? Absolutely. Sourced from the freshest peaks, so you stay hydrated and keep the planet thriving. It’s a raging vibe.",
//         currency: "$",
//         productImages: [sparklingWater, drinnkingWater]

//     },
// ];

const partners = [
    partner1,
    partner2,
    partner3,
    partner4,
    partner5,
    partner6,
    partner7,

]


const Aboutus = () => {
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
                console.log("Fetched products", data)
                setProducts(data);
            } catch (error) {
                console.error("Error fetching featured products:", error);
            }
        };

        fetchFeaturedProducts();
    }, []);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };
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
        <>
            <div className={styles.aboutherosection}>
                <img
                    src={aboutImage}
                    alt="About Us Hero"
                    className={styles.aboutImage}
                />
            </div>

            <div className={styles.aboutContent}>
                <h1 className={styles.aboutTitle}>About Us</h1>
                <p className={styles.aboutText}>
                    Big Elefant won’t crush you! But our infinitely recyclable cans of premium, low-calorie beverages will definitely murder your thirst. And we don’t stop there. After dancing on your thirst’s grave, these savage cans help destroy plastic pollution by donating a portion of proceeds.
                </p>
                <p className={styles.aboutText}>
                    Why? Because for centuries, the coolest, funniest marketing was saved for junk—beer, fast food, candy. Not anymore.
                </p>
                <p className={styles.aboutText}>
                    Big Elefant is here to take over the world using health and humor. One can at a time, we’ll make every drink a Big Elefant. Then, we’ll finally begin harvesting human energy to power our giant marketing bots.
                </p>
                <p className={styles.aboutText}>
                    But enough about us.
                </p>
                <p className={styles.aboutText}>
                    Let’s talk about you.
                </p>
            </div>
            <div className={styles.ctaWrapper}>
                <Link to="/contact-us" className={styles.ctaButton}>
                    Contact Us
                </Link>        
            </div>

            {/* Partner Logos Carousel */}
            {/* <div className={styles.partnerSection}>
                <h2 className={styles.partnerHeading}>Available AT</h2>
                <Marquee gradient={false} speed={50}>
                    <div className={styles.partnerLogoWrapper}>
                        {partners.map((logo, idx) => (
                            <img
                                key={idx}
                                src={logo}
                                alt={`Partner ${idx + 1}`}
                                className={styles.partnerLogo}
                            />
                        ))}
                    </div>
                </Marquee>
            </div> */}


            <div className={styles.productSection}>
                {products.map((product) => (
                    <div key={product._id} className={styles.productBlock}>
                        {/* Product name and subheading */}
                        <div className={styles.productHeader}>
                            <h2 className={styles.productName}>{product.productName}</h2>
                            <p className={styles.productFeatures}>
                                {product.productFeatures.map((feature, index) => (
                                    <span key={index}>
                                        {feature.trim()}
                                        {index !== product.productFeatures.length - 1 && " | "}
                                    </span>
                                ))}
                            </p>
                        </div>

                        {/* Hero product block with background */}
                        <div
                            className={styles.productHero}
                            style={{
                                backgroundImage: `url(${product.background})`,
                            }}
                        >
                            <div className={styles.heroContent}>
                                <div className={styles.heroText}>
                                    <h1 className={styles.heroTitle}>{product.bannerTitle}</h1>
                                    {/* <button className={styles.heroButton}>Shop Now</button> */}
                                    <button
                                        className={styles.heroButton}
                                        onClick={() => handleShopNow(product)}
                                    >
                                        Shop Now
                                    </button>
                                </div>
                                <img
                                    src={product.productImage}
                                    alt={product.title}
                                    className={styles.heroImage}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Reviews />
        </>
    );
}

export default Aboutus