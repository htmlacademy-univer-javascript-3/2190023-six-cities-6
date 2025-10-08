import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchOffers } from './store/offer-thunks';
import type { AppDispatch } from './store';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { OfferPage } from './pages/OfferPage';
import { NotFound } from './components/NotFound';
import { PrivateRoute } from './components/PrivateRoute';
import { checkAuth } from './store/auth-thunk';

const App: React.FC = () => {
    // localStorage.setItem('six-cities-token', 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=');

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkAuth());
        dispatch(fetchOffers());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/favorites"
                    element={
                        <PrivateRoute>
                            <FavoritesPage />
                        </PrivateRoute>
                    }
                />
                <Route path="/offer/:id" element={<OfferPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;