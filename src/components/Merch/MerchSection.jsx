import React from "react";
import styles from "./MerchSection.module.css";
import beveragesBanner from "../../assets/merch.webp"
import { useNavigate } from "react-router-dom";
import WildMerchImage from "../../assets/12.png"
import merchBottle from "../../assets/5.png"
import merchProduct from "../../assets/14.png"
import hoddy from "../../assets/16.png"
import bag from "../../assets/8.png"
import mug from "../../assets/6.png"
import { useState } from "react";
import { useEffect } from "react";
import { sanityClient } from "../../utils/sanityClient";


const MerchSection = () => {
    const [merch, setMerch] = useState([]);

     useEffect(() => {
    const fetchMerch = async () => {
      const query = `
      *[_type == "merchandise"]{
        _id,
        merchName,
        "merchImage": merchImage.asset->url,

        metaTitle,
        metaDescription,
        slug,
        tags,

        isFeatured,
        merchFeatures,
        description,
        currency,

        variants[]{
          productType,
          merchColor,
          "merchImages": merchImages[].asset->url,

          clothSizes[]{
            sizeName,
            mrp,
            price,
            stock,
            deliveryCharges
          },

          bottleSizes[]{
            sizeName,
            mrp,
            price,
            stock,
            deliveryCharges
          },

          bagSizes[]{
            sizeName,
            mrp,
            price,
            stock,
            deliveryCharges
          }
        },

        reviews[]{
          reviewerName,
          rating,
          reviewText
        }
      }
    `;
      const data = await sanityClient.fetch(query);

      setMerch(data);
    };

    fetchMerch();
  }, []);

  const navigate = useNavigate();

  const handleShopNow = (merch) => {
    navigate(`/single-merch-page/${merch.merchName}`, { state: { merch } });
  };

  return (
    <>
      <div className={styles.heroContent}>
        <img src={beveragesBanner} alt="Banner" className={styles.bannerImage} />
      </div>

      <div className={styles.cardSection}>
        <h2 className={styles.sectionTitle}>Merch</h2>

        <div className={styles.cardContainer}>

          {merch.map((merch) => (
            <div key={merch._id} className={styles.card}>
              <img
                src={merch.merchImage}
                alt={merch.merchName}
                className={styles.cardImage}
              />
              <div className={styles.overlayText}>
                Coming Soon
              </div>
              <h3 className={styles.cardTitle}>{merch.merchName}</h3>
              {/* <p className={styles.cardText}>
                {merch.currency} {merch.price}
              </p> */}
              {/* <button
                className={styles.cardButton}
                onClick={() => handleShopNow(merch)}
              >Shop Now</button> */}
              <button
                className={styles.comingSoon}
              // onClick={() => handleShopNow(merch)}
              >TBD COMING SOON</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MerchSection;