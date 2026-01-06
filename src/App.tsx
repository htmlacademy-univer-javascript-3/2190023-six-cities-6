import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { fetchOffers } from './store/offer-thunks';
import { MainPage } from './pages/main-page';
import { LoginPage } from './pages/login-page';
import { FavoritesPage } from './pages/favorites-page';
import { OfferPage } from './pages/offer-page';
import { NotFound } from './components/not-found';
import { PrivateRoute } from './components/private-route';
import { checkAuth } from './store/auth-thunk';
import { useAppDispatch } from './store/redux';
import { Header } from './components/header';

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