import React from 'react';
import type { Offer } from '../mocks/offers';
import  { PlaceCard } from '../components/PlaceCard';

type NearbyOffersListProps = {
    offers: Offer[];
};

export const NearbyOffersList: React.FC<NearbyOffersListProps> = ({ offers }) => (
    <div className="near-places__list places__list">
        {offers.map((offer) => (
            <PlaceCard key={offer.id} offer={offer} cardClassName="near-places__card" imageWrapperClassName="near-places__image-wrapper" />
        ))}
    </div>
);