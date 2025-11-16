import React, { useState } from 'react';
import { PlaceCard } from './PlaceCard';
import type { Offer } from '../types/offer';

type OffersListProps = {
    offers: Offer[];
    onCardHover?: (offerId: string | null) => void;
}

export const OffersList: React.FC<OffersListProps> = ({ offers, onCardHover }) => {

    const [hoverCardId, setHoverCardId] = useState<string | null>(null);

    const handleCardHover = (id: string | null) => {
        setHoverCardId(id);
        onCardHover?.(id);
    };

    return (
        <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
                <PlaceCard key={offer.id} offer={offer} onHover={handleCardHover} />
            ))}
        </div>
    );
};