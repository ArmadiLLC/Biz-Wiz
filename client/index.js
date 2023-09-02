import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store';

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store = {store}>
        <App />
    </Provider>
);

// const rootElement = document.getElementById('root');
// ReactDOM.render(
//     <Provider store = {store}>
//         <App />
//     </Provider>,
//   rootElement,
// );