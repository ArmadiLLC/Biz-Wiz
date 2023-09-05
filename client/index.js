import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { ReactFlow } from 'reactflow';
const root = createRoot(document.getElementById('root'));
import './reactflowbase.css';
import './reactflowstyle.css';
import './app.css';

root.render(
  <Provider store={store}>
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
