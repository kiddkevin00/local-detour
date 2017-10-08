import authActionTypes from '../actiontypes/auth';
import loginActionTypes from '../actiontypes/login';
import landingActionTypes from '../actiontypes/landing';
import eventActionTypes from '../actiontypes/event';


const allActionTypesPerSection = {
  AUTH: authActionTypes,
  LOGIN: loginActionTypes,
  LANDING: landingActionTypes,
  EVENT: eventActionTypes
};

namespaceActionTypesPerSection(allActionTypesPerSection);

function namespaceActionTypesPerSection(actionTypesPerSection) {
  for (const section in actionTypesPerSection) {
    if (actionTypesPerSection.hasOwnProperty(section)) {
      const actionTypes = actionTypesPerSection[section];

      for (const type in actionTypes) {
        if (actionTypes.hasOwnProperty(type)) {
          actionTypes[`_${type}`] = `${actionTypes[type]}`;
          actionTypes[type] = `${section}.${actionTypes[type]}`;
        }
      }
    }
  }
}

export { allActionTypesPerSection as default };
