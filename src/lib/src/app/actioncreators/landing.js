import actionTypes from '../actiontypes/';


const landingActionCreator = {
  finishWaitingForAsyncOps() {
    return {
      type: actionTypes.LANDING.FINISH_WAITING_FOR_ASYNC_OPS,
    };
  },
};

export { landingActionCreator as default };
