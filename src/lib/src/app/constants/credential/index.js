import * as prodCredential from './production';
import * as testCredential from './test';
import * as devCredential from './development';


const env = process.env.NODE_ENV;
let credential;

switch (env) {
  case 'production':
    credential = prodCredential;
    break;
  case 'staging':
    credential = testCredential;
    break;
  default:
    credential = devCredential;
    break;
}

module.exports = exports = credential;
