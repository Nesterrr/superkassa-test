import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../root-reducer';


const initStore = (initialStore = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = window.__REDUX_DEVTOOLS_EXTENSION__
        ? compose(applyMiddleware(
            sagaMiddleware,
        ), window.__REDUX_DEVTOOLS_EXTENSION__())
        : compose(applyMiddleware(
            sagaMiddleware,
        ));

  const store = createStore(
    rootReducer,
    initialStore,
    middleware,
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default initStore;
