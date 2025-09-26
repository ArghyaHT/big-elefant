import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { Autoplay, Navigation } from "swiper/modules";
import styles from "./WildMerch.module.css";
import WildMerchImage from "../../assets/12.png"
import merchBottle from "../../assets/5.png"
import merchProduct from "../../assets/14.png"
import hoddy from "../../assets/16.png"
import bag from "../../assets/8.png"
import mug from "../../assets/6.png"

import { sanityClient } from "../../utils/sanityClient";
import { useState } from "react";
import { useEffect } from "react";


const WildMerchSection = () => {
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

      const featuredProducts = data.filter(product => product.isFeatured);

      setMerch(featuredProducts);
    };

    fetchMerch();
  }, []);



  return (
    <section className={styles.wildMerch}>
      <h2 className={styles.heading}>Wild Merch</h2>

      <div className={styles.cardWrapper}>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={2}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
        >
          {merch.map((product) => (
            <SwiperSlide key={product.id} className={styles.swiperSlide}>
              <div className={styles.card}>
                <img src={product.merchImage} alt={product.merchName} className={styles.image} />
                <div className={styles.overlayText}>
                  Coming Soon
                </div>
                <h3 className={styles.name}>{product.merchName}</h3>
                {/* <p className={styles.price}>{product.price}</p> */}
                <p className={styles.comingSoon}>TBD COMING SOON</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default WildMerchSection;
