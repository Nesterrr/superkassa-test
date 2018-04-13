import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import initStore from './ducks/helpers/configure-store';
import SagasManager from './ducks/helpers/sagas-manager';

import App from './App';

import './index.css';

const store = initStore({});

store.runSaga(SagasManager.getRootSaga());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
