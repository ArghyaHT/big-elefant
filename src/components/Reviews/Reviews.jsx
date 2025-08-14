// ReviewSection.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Reviews.module.css';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { useEffect } from 'react';
import { useState } from 'react';
import { sanityClient } from '../../utils/sanityClient';

// const reviews = [
//     {
//         id: 1,
//         name: 'Alice Johnson',
//         rating: 5,
//         reviewText: 'Absolutely loved the experience! Everything was professional and smooth. Highly recommend.',
//     },
//     {
//         id: 2,
//         name: 'David Kim',
//         rating: 4,
//         reviewText: 'Great service, but the wait time was a little longer than expected.',
//         productName: ""
//     },
//     {
//         id: 3,
//         name: 'Emma Lee',
//         rating: 3.7,
//         reviewText: 'One of the best experiences I’ve had! Staff was friendly and everything was perfect.',
//     },
//     {
//         id: 4,
//         name: 'Noah Patel',
//         rating: 2.4,
//         reviewText: 'Decent experience, but I think there’s room for improvement in communication.',
//     },
// ];


const Reviews = () => {
    const [products, setProducts] = useState([]);
const [allReviews, setAllReviews] = useState([]);


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

            // 🔽 Merge reviews from all products
            const mergedReviews = data.flatMap(product => product.reviews || []);
            setAllReviews(mergedReviews); // <-- Save in a separate state

        } catch (error) {
            console.error("Error fetching featured products:", error);
        }
    };

    fetchFeaturedProducts();
}, []);



    return (
        <div className={styles.reviewWrapper}>
            <h2 className={styles.heading}>Reviews</h2>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                pagination={{ clickable: true, }}
                autoplay={{ delay: 4000 }}
                loop={true}
                className={styles.swiperContainer}
                breakpoints={{
                    0: {
                        slidesPerView: 2, // for very small screens
                    },
                    480: {
                        slidesPerView: 2, // small phones
                    },
                    768: {
                        slidesPerView: 2, // tablets
                    },
                    1024: {
                        slidesPerView: 3, // desktop
                    },
                }}

            >
                {allReviews.map((review, index) => (
                    <SwiperSlide key={index} className={styles.reviewCard}>
                        <p className={styles.reviewText}>"{review.reviewText}"</p>
                        <div className={styles.stars}>
                            {Array.from({ length: 5 }, (_, i) => {
                                const rating = review.rating;
                                if (i < Math.floor(rating)) {
                                    return <FaStar key={i} color="#d4a13b" />;
                                } else if (i < rating) {
                                    return <FaStarHalfAlt key={i} color="#d4a13b" />;
                                } else {
                                    return <CiStar key={i} color="#ccc" />;
                                }
                            })}
                        </div>
                        <p className={styles.reviewerName}>-{review.reviewerName}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Reviews;
