import React from 'react';
import { Link } from 'react-router';
import type { Offer } from '../mocks/offers';

type PlaceCardProps = {
    offer: Offer;
    cardClassName?: string;
    imageWrapperClassName?: string;
};

export const PlaceCard: React.FC<PlaceCardProps> = ({ 
    offer,
    cardClassName = 'cities__card',
    imageWrapperClassName = 'cities__image-wrapper'
 }) => {
    return (
        <article className={`${cardClassName} place-card`}>
            {offer.isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
                <a href="#">
                    <img 
                        className="place-card__image" 
                        src={offer.previewImage} 
                        width="260" 
                        height="200" 
                        alt={offer.title} 
                    />
                </a>
            </div>
            <div className="place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{offer.price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button 
                        className={`place-card__bookmark-button button${offer.isFavorite ? ' place-card__bookmark-button--active' : ''}`} 
                        type="button"
                    >
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{ width: `${offer.rating * 20}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
                </h2>
                <p className="place-card__type">{offer.type}</p>
            </div>
        </article>
    );
}