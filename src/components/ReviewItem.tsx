import React from 'react';

export type Review = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
};

type ReviewItemProps = {
  review: Review;
};

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={review.user.avatarUrl}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{review.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{ width: `${review.rating * 20}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">{review.comment}</p>
      <time className="reviews__time" dateTime={review.date}>
        {new Date(review.date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
      </time>
    </div>
  </li>
);