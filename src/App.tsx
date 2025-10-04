import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { PropertyPage } from './pages/PropertyPage';
import { NotFound } from './components/NotFound';
import { PrivateRoute } from './components/PrivateRoute';

type AppProps = {
    offersCount: number;
}

const App: React.FC<AppProps> = ({ offersCount }) => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage offersCount={offersCount} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
                path="/favorites" 
                element={
                    <PrivateRoute isAuthorized={false}>
                        <FavoritesPage />
                    </PrivateRoute>
                } 
            />
            <Route path="/offer/:id" element={<PropertyPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default App;