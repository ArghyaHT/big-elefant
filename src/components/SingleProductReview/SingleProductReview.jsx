// ReviewSection.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from '../Reviews/Reviews.module.css'
import { Pagination, Autoplay } from 'swiper/modules';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { useEffect } from 'react';
import { useState } from 'react';
import { sanityClient } from '../../utils/sanityClient';


const SingleProductReview = ({ product }) => {
    const allReviews = product?.reviews || [];

    return (
        <div className={styles.reviewWrapper}>
            <h2 className={styles.heading}>Reviews</h2>

            {allReviews.length === 0 ? (
                <p className={styles.noReviewText}>No reviews present</p>
            ) : (
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop={true}
                    className={styles.swiperContainer}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
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
            )}
        </div>
    );
};

export default SingleProductReview;
