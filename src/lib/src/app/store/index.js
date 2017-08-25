import rootReducer from '../reducers/';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';


function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(loggerMiddleware),
    global.__DEV__ && global.__REDUX_DEVTOOLS_EXTENSION__ ?
      global.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  ));

  return store;
}

export default configureStore;
