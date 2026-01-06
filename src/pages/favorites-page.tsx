import React from 'react';
import { FavoritesList } from '../components/favorites-list';
import { FavoritesEmptyPage } from './favorites-empty-page';
import { useAppSelector } from '../store/redux';

export const FavoritesPage: React.FC = () => {
    const offers = useAppSelector((state) => state.offers.items);
    const favoriteOffers = offers.filter((offer) => offer.isFavorite);

    if (favoriteOffers.length === 0) {
        return <FavoritesEmptyPage />
    }

    return (
        <>
            <div className="page">
                <main className="page__main page__main--favorites">
                    <div className="page__favorites-container container">
                        <section className="favorites">
                            <h1 className="favorites__title">Saved listing</h1>
                            <FavoritesList offers={favoriteOffers} />
                        </section>
                    </div>
                </main>
                <footer className="footer container">
                    <a className="footer__logo-link" href="main.html">
                        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
                    </a>
                </footer>
            </div>
        </>
    );
}