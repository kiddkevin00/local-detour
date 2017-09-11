import rootReducer from '../reducers/';
import firebaseProxy from '../proxies/FirebaseProxy';
import { reactReduxFirebase } from 'react-redux-firebase';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';


const config = { userProfile: 'users' };

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(loggerMiddleware),
    reactReduxFirebase(firebaseProxy, config),
    (global.__DEV__ && global.__REDUX_DEVTOOLS_EXTENSION__) ?
      global.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  ));

  return store;
}

export default configureStore;
