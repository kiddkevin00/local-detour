import * as firebaseProxy from 'firebase';


const config = {
  apiKey: 'AIzaSyAre2dhv3bh1EUve7mTCmqB2jaEXo5hg8s',
  authDomain: 'spiritual-guide-476dd.firebaseapp.com',
  databaseURL: 'https://spiritual-guide-476dd.firebaseio.com',
  projectId: 'spiritual-guide-476dd',
  storageBucket: 'spiritual-guide-476dd.appspot.com',
  messagingSenderId: '284674125062',
};

firebaseProxy.initializeApp(config);

export const firebaseDb = firebaseProxy.database();
export const firebaseAuth = firebaseProxy.auth();
export const firebaseGoogleAuthProvider = new firebaseProxy.auth.GoogleAuthProvider();
export default firebaseProxy;
