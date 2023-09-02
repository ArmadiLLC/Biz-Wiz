import { combineReducers } from 'redux';

// import all reducers here
import chartsReducer from './chartsReducer';

// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  chart: chartsReducer
});

// make the combined reducers available for import
export default reducers;