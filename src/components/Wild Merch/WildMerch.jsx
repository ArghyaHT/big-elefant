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




// Dummy product data
const sampleMerch = [
  {
    id: 1,
    name: "Elephant Tee",
    price: "₹1999",
    image: WildMerchImage,
    features: "100% Organic Cotton, Eco-Friendly Print, Unisex Fit",
  },
  {
    id: 2,
    name: "Crush Mug",
    price: "₹2599",
    image: mug,
    features: "Recycled Ceramic, Dishwasher Safe, 11oz Capacity",
  },
  {
    id: 3,
    name: "Wild Hoddy",
    price: "₹2999",
    image: hoddy,
    features: "Made from Recycled Polyester, Adjustable Fit, Sun Protection",
  },
  {
    id: 4,
    name: "Wild Bag",
    price: "₹1999",
    image: bag,
    features: "BPA-Free Stainless Steel, 750ml Capacity, Keeps Drinks Cold 12h",
  },
  {
    id: 5,
    name: "Wild Bottle",
    price: "₹999",
    image: merchBottle,
    features: "Handmade, Recycled Materials, Artisan Support",
  },
];

const WildMerchSection = () => {
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
          {sampleMerch.map((product) => (
            <SwiperSlide key={product.id} className={styles.swiperSlide}>
              <div className={styles.card}>
                <img src={product.image} alt={product.name} className={styles.image} />
                <div className={styles.overlayText}>
                  Coming Soon
                </div>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>{product.price}</p>
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
