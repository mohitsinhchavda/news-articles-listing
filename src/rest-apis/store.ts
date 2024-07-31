// store.ts
import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';
import { RootState, RootAction } from './types'; // Import your RootState and RootAction types
import rootSaga from './sagas';
import rootReducer from './reducers/index';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the store with type `Store<RootState, RootAction>`
const store: Store<RootState, RootAction> = createStore(
  rootReducer,
  composeWithDevTools({ trace: true })(applyMiddleware(sagaMiddleware))
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
