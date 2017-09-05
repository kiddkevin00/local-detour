import Events from '../components/Events';
import actionTypes from '../actiontypes/';
import { firebaseAuth, firebaseAuthProviders } from '../proxies/FirebaseProxy';
import {
  AccessToken,
} from 'react-native-fbsdk';


const landingActionCreator = {
  facebookPostLogin(navigator) {
    return async (dispatch/*, getState*/) => {
      dispatch({
        type: actionTypes.LOGIN.LOGGING_IN,
      });

      try {
        const { accessToken } = await AccessToken.getCurrentAccessToken();
        const credential = firebaseAuthProviders.FacebookAuthProvider.credential(accessToken);

        // [TODO] Saves `userInfo` to Redux state.
        const userInfo = await firebaseAuth.signInWithCredential(credential);

        dispatch({
          type: actionTypes.AUTH.FACEBOOK_LOGIN_SUCCEED,
          payload: {
            userInfo: {
              uid: userInfo.uid,
              displayName: userInfo.displayName,
              email: userInfo.email,
              photoURL: userInfo.photoURL,
              isAnonymous: userInfo.isAnonymous,
            },
          },
        });

        dispatch({
          type: actionTypes.LOGIN.FACEBOOK_LOGIN_SUCCEED,
        });

        navigator.push({
          component: Events,
        });
      } catch (err) {
        global.alert(`Facebook login with Firebase failed: ${err}`);
      }
    };
  },
};

export { landingActionCreator as default };
