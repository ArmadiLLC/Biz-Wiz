import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
// import 'reactflow/dist/base.css';
// import 'reactflow/dist/style.css';
const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    hello
    <App />
  </Provider>,
);

// const rootElement = document.getElementById('root');
// ReactDOM.render(
//     <Provider store = {store}>
//         <App />
//     </Provider>,
//   rootElement,
// );
