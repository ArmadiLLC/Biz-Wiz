import * as types from '../constants/actionTypes';

const initialState = {
    
};
  
  const chartsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_EMPLOYEE:
          return state;
        case types.FIND_EMPLOYEE:
          return state;
        case types.UPDATE_EMPLOYEE:
          return state;
        case types.DELETE_EMPLOYEE:
          return state;
        default:
            return state;
    }
  };
  
  export default chartsReducer;