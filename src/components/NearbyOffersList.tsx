import React, { useState } from 'react';
import type { Offer } from '../types/offer';
import { PlaceCard } from '../components/PlaceCard';

type NearbyOffersListProps = {
    offers: Offer[];
    onHover?: (offerId: string | null) => void;
};

export const NearbyOffersList: React.FC<NearbyOffersListProps> = ({ offers, onHover }) => {

    const [hoverCardId, setHoverCardId] = useState<string | null>(null);

    const handleCardHover = (id: string | null) => {
        setHoverCardId(id);
        onHover?.(id);
    };

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