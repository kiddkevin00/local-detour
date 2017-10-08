import actionTypes from '../actiontypes/';


const initialState = {
  events: []
};

function eventsReducer(state = initialState, action) {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case actionTypes.EVENT.LOAD_EVENTS:
      return {
        ...state,
        events: actionPayload.events,
      };
    default:
      return state;
  }
}

export { eventsReducer as default };
