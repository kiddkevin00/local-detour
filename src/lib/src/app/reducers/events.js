import actionTypes from '../actiontypes/';


const initialState = {
  photo: {}
};

function eventsReducer(state = initialState, action) {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case actionTypes.EVENT.SAVE_EVENT_PHOTO:
      return {
        ...state,
        photo: { ...state.photo, [actionPayload.eventName]: actionPayload.photoURI }
      };
    default:
      return state;
  }
}

export { eventsReducer as default };
