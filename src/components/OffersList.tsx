import React from 'react';
import { PlaceCard } from './PlaceCard';
import type { Offer } from '../types/offer';

type OffersListProps = {
    offers: Offer[];
    onCardHover?: (offerId: string | null) => void;
}

export const OffersList: React.FC<OffersListProps> = ({ offers, onCardHover }) => {

    const handleCardHover = React.useCallback((id: string | null) => {
        onCardHover?.(id);
    }, [onCardHover]);

    return (
        <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
                <PlaceCard key={offer.id} offer={offer} onHover={handleCardHover} />
            ))}
        </div>
    );
};