import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { offers } from './mocks/offers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App offers={offers}/>
    </React.StrictMode>
)