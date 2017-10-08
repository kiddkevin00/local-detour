import auth from './auth';
import events from './events';
import landing from '../reducers/landing';
import { firebaseStateReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  auth,
  landing,
  events,
});

export { rootReducer as default };
