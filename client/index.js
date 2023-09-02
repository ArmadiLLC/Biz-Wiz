import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import style from './scss/app.scss';
import store from './store';

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store = {store}>
        <App />
    </Provider>
);