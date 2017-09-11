const sources = {
  LOCAL_DETOUR: 'local-detour',
};
const httpStatusCodes = {
  OK: 200,
  FOUND: 302,
  PERMANENT_REDIRECT: 308,
  BAD_REQUEST: 400,
  UNAUTHENTICATED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
};

export const SOURCES = sources;

export const HTTP_STATUS_CODES = httpStatusCodes;

export const COMMON = {
  CURRENT_SOURCE: sources.LOCAL_DETOUR,
};

export const DEFAULT_CONFIG = {};

// This is the only place aggregating all error codes.
export const ERROR_CODES = Object.assign({}, httpStatusCodes, {
  UNKNOWN_ERROR: 1000,
});

export const ERROR_NAMES = {
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  PROXY_ERROR: 'PROXY_ERROR',
};

export const ERROR_MSG = {
  UNKNOWN_ERROR: 'Something went wrong.',
  PROXY_ERROR: 'An error occurred in HTTP proxy module.',
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};
