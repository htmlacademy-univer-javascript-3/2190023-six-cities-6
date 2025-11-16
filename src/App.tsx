import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { MainPage } from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { PropertyPage } from './pages/PropertyPage';
import { NotFound } from './components/NotFound';
import { PrivateRoute } from './components/PrivateRoute';


const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
                path="/favorites" 
                element={
                    <PrivateRoute isAuthorized={true}>
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