const StandardErrorWrapper = require('../utils/standard-error-wrapper');
const constants = require('../constants/');


class HttpRequest {

  static exec(url, options) {
    return global.fetch(url, options)
      .then((response) => {
        if (response.status !== constants.SYSTEM.HTTP_STATUS_CODES.OK) {
          // Assumes that the response body follows the standard error format.
          return response.json();
        }
        return response.json();
      })
      .catch((_err) => {
        const err = new StandardErrorWrapper([
          {
            code: constants.SYSTEM.ERROR_CODES.INTERNAL_SERVER_ERROR,
            name: constants.SYSTEM.ERROR_NAMES.PROXY_ERROR,
            source: constants.SYSTEM.COMMON.CURRENT_SOURCE,
            message: (_err && _err.message) ? _err.message : constants.SYSTEM.ERROR_MSG.PROXY_ERROR,
            detail: _err,
          },
        ]);

        throw err;
      });
  }

}

class HttpProxy {

  static get(_url, queryStringObj = {}, headers = {}) {
    const url = HttpProxy._getFullUrl(_url, queryStringObj);
    const options = {
      headers,
      method: constants.SYSTEM.HTTP_METHODS.GET,
      mode: 'cors',
      credentials: 'include',
      redirect: 'follow',
    };

    return HttpRequest.exec(url, options);
  }

  static post(_url, body = {}, headers = {}, queryStringObj = {}) {
    const url = HttpProxy._getFullUrl(_url, queryStringObj);
    const options = {
      headers,
      body: global.JSON.stringify(body),
      method: constants.SYSTEM.HTTP_METHODS.POST,
      mode: 'cors',
      credentials: 'include',
    };

    return HttpRequest.exec(url, options);
  }

  static put(_url, body = {}, headers = {}, queryStringObj = {}) {
    const url = HttpProxy._getFullUrl(_url, queryStringObj);
    const options = {
      headers,
      body: global.JSON.stringify(body),
      method: constants.SYSTEM.HTTP_METHODS.PUT,
      mode: 'cors',
      credentials: 'include',
    };

    return HttpRequest.exec(url, options);
  }

  static delete(_url, body = {}, headers = {}, queryStringObj = {}) {
    const url = HttpProxy._getFullUrl(_url, queryStringObj);
    const options = {
      headers,
      body: global.JSON.stringify(body),
      method: constants.SYSTEM.HTTP_METHODS.DELETE,
      mode: 'cors',
      credentials: 'include',
    };

    return HttpRequest.exec(url, options);
  }

  static _getFullUrl(url, queryStringObj = {}) {
    let fullUrl;

    if (url[0] === '/') {
      const env = process.env.NODE_ENV;
      let urlBase;

      switch (env) {
        case 'production':
          urlBase = constants.SYSTEM.URL_BASES.PROD_BACKEND_API;
          break;
        case 'staging':
          urlBase = constants.SYSTEM.URL_BASES.TEST_BACKEND_API;
          break;
        default:
          urlBase = constants.SYSTEM.URL_BASES.LOCAL_BACKEND_API;
          break;
      }

      fullUrl = urlBase + url;
    } else {
      fullUrl = url;
    }

    if (Object.keys(queryStringObj).length) {
      fullUrl += `?${HttpProxy._parseQueryStringObj(queryStringObj)}`;
    }

    return fullUrl;
  }

  static _parseQueryStringObj(queryStringObj) {
    const esc = global.encodeURIComponent;

    return Object.keys(queryStringObj)
      .map((key) => `${esc(key)}=${esc(queryStringObj[key])}`)
      .join('&');
  }

}

module.exports = HttpProxy;
