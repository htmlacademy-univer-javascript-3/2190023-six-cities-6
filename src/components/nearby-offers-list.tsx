import React from 'react';
import type { Offer } from '../types/offer';
import { PlaceCard } from './place-card';

type NearbyOffersListProps = {
    offers: Offer[];
    onHover?: (offerId: string | null) => void;
};

export const NearbyOffersList: React.FC<NearbyOffersListProps> = ({ offers, onHover }) => {

    const handleCardHover = (id: string | null) => {
        onHover?.(id);
    }

    return (
        <div className="near-places__list places__list">
            {offers.map((offer) => (
                <PlaceCard
                    key={offer.id}
                    offer={offer}
                    cardClassName="near-places__card"
                    imageWrapperClassName="near-places__image-wrapper"
                    onHover={handleCardHover}
                />
            ))}
        </div>
    );
};