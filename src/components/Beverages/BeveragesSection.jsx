import React, { useEffect, useState } from "react";
import styles from "./BeveragesSection.module.css";

import limitedOffer from "../../assets/limitedOffer.png"
import sparklingWater from "../../assets/sparkling-water.png"
import drinnkingWater from "../../assets/drinking-water.png"
import beveragesBanner from "../../assets/beverages.webp"
import { useNavigate } from "react-router-dom";
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
//         price: 35,
//         productDescription: "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable. Eco-conscious? Absolutely. Sourced from the freshest peaks, so you stay hydrated and keep the planet thriving. It’s a raging vibe.",
//         currency: "$",
//         productImages: [drinnkingWater, sparklingWater],
//         category: "Water",               // Added category here

//     },
//     {
//         id: 2,
//         productName: "Soda-flavored sparkling water",
//         title: "You won't believe it’s not soda.",
//         description: "Second product description goes here.",
//         features: "Sparkling Water, No Artificial Sweeteners",
//         writer: "Kelly",
//         productImage: sparklingWater,
//         price: 50,
//         productDescription: "Level up your hydration game. We’re serving up pure mountain water in cans that are legit forever recyclable. Eco-conscious? Absolutely. Sourced from the freshest peaks, so you stay hydrated and keep the planet thriving. It’s a raging vibe.",
//         currency: "$",
//         productImages: [sparklingWater, drinnkingWater],
//         category: "Water",               // Added category here


//     },
// ];


const BeveragesSection = () => {
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
            <div className={styles.heroContent}>
                <img src={beveragesBanner} alt="Banner" className={styles.bannerImage} />
            </div>

            <div className={styles.cardSection}>
                <h2 className={styles.sectionTitle}>Bigele Beverages</h2>

                <div className={styles.cardContainer}>
                    {products.map((product) => (
                        <div key={product._id} className={styles.card} onClick={() => handleShopNow(product)}>
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className={styles.cardImage}
                            />
                            <h3 className={styles.cardTitle}>{product.productName}</h3>
                            <p className={styles.cardText}>{product.features}</p>
                            <button
                                className={styles.cardButton}
                                onClick={() => handleShopNow(product)}
                            >Shop Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default BeveragesSection;
