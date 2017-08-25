import landing from '../reducers/landing';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  landing,
});

export { rootReducer as default };
