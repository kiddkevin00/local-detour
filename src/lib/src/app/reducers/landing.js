import actionTypes from '../actiontypes/';


const initialState = {
  waitingForAsyncOps: true,
};

function landingReducer(state = initialState, action) {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case actionTypes.LANDING.FINISH_WAITING_FOR_ASYNC_OPS:
      return {
        ...state,
        waitingForAsyncOps: false,
      };
    default:
      return state;
  }
}

export { landingReducer as default };
