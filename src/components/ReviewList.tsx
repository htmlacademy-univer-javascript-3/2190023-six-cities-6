import React from "react";
import type { Review } from "./ReviewItem";
import { ReviewItem } from "./ReviewItem";

type ReviewListProps = {
    reviews: Review[];
};

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => (
    <section className="offer__reviews reviews">
        <h2 className="reviews__title">
            Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
        </h2>
        <ul className="reviews__list">
            {reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
            ))}
        </ul>
    </section>
);