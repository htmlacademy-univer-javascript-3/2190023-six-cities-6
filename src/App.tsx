import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { fetchOffers } from './store/offer-thunks';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { OfferPage } from './pages/OfferPage';
import { NotFound } from './components/NotFound';
import { PrivateRoute } from './components/PrivateRoute';
import { checkAuth } from './store/auth-thunk';
import { Header } from './components/Header';
import { useAppDispatch } from './store/redux';

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
        dispatch(fetchOffers());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Header />
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