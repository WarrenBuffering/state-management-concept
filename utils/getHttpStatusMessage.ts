const statusMessages = {
  400: 'The request was invalid or cannot be served.',
  401: 'The request requires authentication.',
  403: "You don't have permission to access this resource.",
  404: 'The requested resource could not be found.',
  405: 'The request method is not allowed for this resource.',
  406: 'The requested resource is not available in a format acceptable by the client.',
  407: 'You must authenticate with the proxy server.',
  408: 'The server timed out waiting for the request.',
  409: 'The request could not be completed due to a conflict.',
  410: 'The requested resource is no longer available.',
  411: 'The request requires a content length.',
  412: 'The server does not meet one of the preconditions specified by the client.',
  413: 'The request is too large for the server to process.',
  414: 'The request URL is too long.',
  415: 'The request media type is not supported.',
  416: 'The requested range is not satisfiable.',
  417: "The server cannot meet the client's expectation.",
  422: 'The request was well-formed but was unable to be processed.',
  423: 'The resource is locked.',
  424: 'The request failed due to a previous request failure.',
  425: 'The request is too early to process.',
  500: 'An internal server error occurred.',
  501: 'The server does not recognize the request method.',
  502: 'The server received an invalid response from the upstream server.',
  503: 'The server is currently unavailable. Please try again later.',
  504: 'The server did not receive a timely response from the upstream server.',
  505: 'The server does not support the HTTP version used in the request.',
};

export function getHttpStatusMessage(status: number): string {
  return statusMessages[status] || `An unknown error occured.`;
}
