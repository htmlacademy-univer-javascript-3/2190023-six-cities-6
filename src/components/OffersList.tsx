import React from 'react';
import type { Offer } from '../mocks/offers';
import { PlaceCard } from './PlaceCard';

type OffersListProps = {
    offers: Offer[];
    onCardHover?: (id: string | null) => void;
};

export const OffersList: React.FC<OffersListProps> = ({ offers, onCardHover }) => (
    <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => (
            <PlaceCard key={offer.id} offer={offer} onHover={onCardHover} />
        ))}
    </div>
);