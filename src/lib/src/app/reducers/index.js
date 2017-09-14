import auth from './auth';
import landing from '../reducers/landing';
import { firebaseStateReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  auth,
  landing,
});

export { rootReducer as default };
