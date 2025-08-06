import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import { Autoplay, Navigation } from "swiper/modules";
import styles from "./WildMerch.module.css";
import WildMerchImage from "../../assets/WildMerch.png"
import merchBottle from "../../assets/merchBottle.png"
import merchProduct from "../../assets/merchProduct.png"

// Dummy product data
const sampleMerch = [
  {
    id: 1,
    name: "Elephant Tee",
    price: "$29.99",
    image: WildMerchImage,
    features: "100% Organic Cotton, Eco-Friendly Print, Unisex Fit",
  },
  {
    id: 2,
    name: "Crush Mug",
    price: "$14.99",
    image: merchBottle,
    features: "Recycled Ceramic, Dishwasher Safe, 11oz Capacity",
  },
  {
    id: 3,
    name: "Plastic Slayer Hat",
    price: "$24.99",
    image: WildMerchImage,
    features: "Made from Recycled Polyester, Adjustable Fit, Sun Protection",
  },
  {
    id: 4,
    name: "Wild Bottle",
    price: "$19.99",
    image: merchBottle,
    features: "BPA-Free Stainless Steel, 750ml Capacity, Keeps Drinks Cold 12h",
  },
  {
    id: 5,
    name: "Wild Craft",
    price: "$19.99",
    image: merchProduct,
    features: "Handmade, Recycled Materials, Artisan Support",
  },
];

const WildMerchSection = () => {
  return (
    <section className={styles.wildMerch}>
      <h2 className={styles.heading}>Wild Merch</h2>

      <div className={styles.cardWrapper}>
        <Swiper
          modules={[Navigation,Autoplay ]}
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
