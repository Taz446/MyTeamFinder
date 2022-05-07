// // -------About-------
// Software Development Capstone Project
// Developer: Lykourinos Anastasios
// Supervisor: Prof. E. Vagianou
// Deree – The American College of Greece
// Fall Semester 2021
// // 

import React from 'react';
import ReactDOM from'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './components/App.js';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

const Persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
            <App/>
        </PersistGate>
    </Provider>
, document.querySelector('#root'));