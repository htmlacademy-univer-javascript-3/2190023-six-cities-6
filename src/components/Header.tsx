import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import type { RootState } from '../store';

export const Header: React.FC = () => {
    const offers = useSelector((state: RootState) => state.offers.items);
    const favoriteCount = offers.filter((offer) => offer.isFavorite).length;
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Link to="/" className="header__logo-link header__logo-link--active">
                            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                        </Link>
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            <li className="header__nav-item user">
                                <div className="header__nav-link header__nav-link--profile">
                                    <div className="header__avatar-wrapper user__avatar-wrapper">
                                    </div>
                                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                                    <Link to="/favorites" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <span className="header__favorite-count">{favoriteCount}</span>
                                    </Link>
                                </div>
                            </li>
                            <li className="header__nav-item">
                                <a className="header__nav-link" href="#">
                                    <span className="header__signout">Sign out</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};