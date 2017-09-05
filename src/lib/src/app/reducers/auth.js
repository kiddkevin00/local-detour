import actionTypes from '../actiontypes/';


const initialUserState = {
  uid: undefined,
  displayName: undefined,
  email: undefined,
  photoURL: undefined,
  isAnonymous: undefined,
};
const initialState = {
  isLoggedIn: false,
  userInfo: initialUserState,
};

function authReducer(state = initialState, action) {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case actionTypes.AUTH.FACEBOOK_LOGIN_SUCCEED:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: actionPayload.userInfo,
      };
    default:
      return state;
  }
}

export { authReducer as default };
