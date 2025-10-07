import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export const CommentForm: React.FC = () => {
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState('');

    const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRating(Number(e.target.value));
    };

    const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // implement here the server sending logic
    }

    return (
        <form className="reviews__form form" onSubmit={handleSubmit} action="#" method="post">
            <label className="reviews__label form__label" htmlFor="review">Your review</label>
            <div className="reviews__rating-form form__rating">
                {[5, 4, 3, 2, 1].map((star) => (
                    <React.Fragment key={star}>
                        <input
                            className="form__rating-input visually-hidden"
                            name="rating"
                            value={star}
                            id={`${star}-stars`}
                            type="radio"
                            checked={rating === star}
                            onChange={handleRatingChange}
                        />
                        <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title={
                            star === 5 ? 'perfect' :
                                star === 4 ? 'good' :
                                    star === 3 ? 'not bad' :
                                        star === 2 ? 'badly' : 'terribly'
                        }>
                            <svg className="form__star-image" width="37" height="33">
                                <use xlinkHref="#icon-star"></use>
                            </svg>
                        </label>
                    </React.Fragment>
                ))}
            </div>
            <textarea
                className="reviews__textarea form__textarea"
                id="review"
                name="review"
                placeholder="Tell how was your stay, what you like and what can be improved"
                value={comment}
                onChange={handleCommentChange}
            />
            <div className="reviews__button-wrapper">
                <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                </p>

                <button
                    className="reviews__submit form__submit button"
                    type="submit"
                    disabled={rating === null || comment.length < 50}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}