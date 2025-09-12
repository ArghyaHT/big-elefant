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



// Dummy product data
const sampleMerch = [
  {
    id: 1,
    name: "Elephant Tee",
    price: "2999",
    currency: "₹",
    image: WildMerchImage,
    features: ["100% Organic Cotton", "Eco-Friendly Print", "Unisex Fit"],
    description:
      "A soft and breathable tee made from organic cotton. Features a bold elephant print to show your wild side. Eco-friendly inks that don't harm the planet. Comfortable unisex fit for everyday wear.",
    merchImages: [WildMerchImage, merchProduct],
    reviews: [5, 4, 5, 2, 1, 3, 4, 4, 3, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  },
  {
    id: 2,
    name: "Crush Mug",
    price: "1499",
    currency: "₹",
    image: mug,
    features: ["Recycled Ceramic", "Dishwasher Safe", "11oz Capacity"],
    description:
      "Start your day right with this eco mug. Made from recycled ceramic for a sturdy feel. Holds 11oz of your favorite drink. Dishwasher-safe and perfect for daily use.",
    merchImages: [merchBottle, merchProduct],
    reviews: [4, 4, 3],
  },
  {
    id: 3,
    name: "Wild Hoddy",
    price: "2499",
    currency: "₹",
    image: hoddy,
    features: ["Made from Recycled Polyester", "Adjustable Fit", "Sun Protection"],
    description:
      "Stylish sun protection with purpose. Crafted from recycled plastic bottles. Adjustable strap for a perfect fit. Show your stance against plastic pollution.",
    merchImages: [WildMerchImage, merchProduct],
    reviews: [5, 5, 4],
  },
  {
    id: 4,
    name: "Wild Bag",
    price: "1999",
    currency: "₹",
    image: bag,
    features: ["BPA-Free", "Stainless Steel", "750ml Capacity", "Keeps Drinks Cold 12h"],
    description:
      "Stay hydrated while saving the planet. BPA-free and made with durable stainless steel. Keeps drinks cold for up to 12 hours. Ideal for hiking, gym, or travel.",
    merchImages: [merchBottle, merchProduct],
    reviews: [4, 5, 5],
  },
  {
    id: 5,
    name: "Wild Bottle",
    price: "1999",
    currency: "₹",
    image: merchBottle,
    features: ["Handmade", "Recycled Materials", "Artisan Support"],
    description:
      "Handcrafted with love from recycled goods. Every piece supports skilled artisans. A blend of tradition, style, and impact. Perfect for gifting or personal use.",
    merchImages: [merchProduct, WildMerchImage],
    reviews: [5, 4, 4],
  },
];




const MerchSection = () => {
  const navigate = useNavigate();

  const handleShopNow = (merch) => {
    navigate(`/single-merch-page/${merch.id}`, { state: { merch } });
  };

  return (
    <>
      {/* <div className={styles.heroContent}>
                Left section
                <div className={styles.leftSection}>
                    <img src={limitedOffer} className={styles.heroImage} />
                    <p className={styles.imageText}>Talk about your choose</p>
                </div>

                Right section
                <div className={styles.rightSection}>
                    {products.map((product) => (
                        <div className={styles.imageWrapper} key={product.id}>
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className={styles.productImage}
                            />
                        </div>
                    ))}
                </div>

            </div> */}
      <div className={styles.heroContent}>
        <img src={beveragesBanner} alt="Banner" className={styles.bannerImage} />
      </div>

      <div className={styles.cardSection}>
        <h2 className={styles.sectionTitle}>Merch</h2>

        <div className={styles.cardContainer}>

          {sampleMerch.map((merch) => (
            <div key={merch.id} className={styles.card}>
              <img
                src={merch.image}
                alt={merch.name}
                className={styles.cardImage}
              />
              <div className={styles.overlayText}>
                Coming Soon
              </div>
              <h3 className={styles.cardTitle}>{merch.name}</h3>
              <p className={styles.cardText}>
                {Array.isArray(merch.features) ? merch.features.join(', ') : merch.features}
              </p>
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