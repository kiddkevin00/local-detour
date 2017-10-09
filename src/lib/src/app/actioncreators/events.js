import actionTypes from '../actiontypes/';
import RNFetchBlob from 'react-native-fetch-blob';


const eventsActionCreator = {
  getAndStoreEventPhotoAsync(event) {
    return async (dispatch/*, getState*/) => {
      try {
        const res = await RNFetchBlob
            .config({
              fileCache: true,
              appendExt: 'jpg'
            })
            .fetch('GET', event.heroPhoto)

        const photoURI = res.path();
        const eventName = event.name;

        dispatch({
          type: actionTypes.EVENT.SAVE_EVENT_PHOTO,
          payload: {
            eventName,
            photoURI
          },
        });
      } catch (err) {
        console.log(`Problem getting event photo: ${err}`)
      }
    };
  },
};

export { eventsActionCreator as default };
