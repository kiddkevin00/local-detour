import actionTypes from '../actiontypes/';


const initialState = {
  isWaitingForAsyncOps: true,
};

function landingReducer(state = initialState, action) {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case actionTypes.LANDING.FINISH_WAITING_FOR_ASYNC_OPS:
      return {
        ...state,
        isWaitingForAsyncOps: false,
      };
    default:
      return state;
  }
}

export { landingReducer as default };
