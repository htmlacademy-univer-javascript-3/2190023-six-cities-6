import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { AuthorizationStatus } from '../store/auth-slice';
import { selectAuthorizationStatus } from '../store/selectors';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../store/auth-thunk';

export const Header: React.FC = React.memo(() => {
    const favoriteCount = useSelector((state: RootState) => state.offers.items.filter((offer) => offer.isFavorite).length); 
    const authorizationStatus = useSelector(selectAuthorizationStatus);
    const dispatch = useDispatch<AppDispatch>();

    const handleSignOut = () => {
        dispatch(logout());
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Link to="/" className="header__logo-link header__logo-link--active">
                            <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
                        </Link>
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            <li className="header__nav-item user">
                                {authorizationStatus === AuthorizationStatus.Authorized ? (
                                    <div className="header__nav-link header__nav-link--profile">
                                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                                        <Link to="/favorites" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <span className="header__favorite-count">{favoriteCount}</span>
                                        </Link>
                                    </div>
                                ) : (
                                    <Link to="/login" className="header__nav-link header__nav-link--profile">
                                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                                        <span className="header__login">Sign in</span>
                                    </Link>
                                )}
                            </li>
                            {authorizationStatus === AuthorizationStatus.Authorized && (
                                <li className="header__nav-item">
                                    <button
                                        className="header__nav-link"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                        onClick={handleSignOut}
                                    >
                                        <span className="header__signout">Sign out</span>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
});