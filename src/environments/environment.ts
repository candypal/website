// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // restUrl: 'http://localhost:8080',
  // restUrl: 'https://andycandifood.appspot.com',
  restUrl: 'https://gauramargrest.appspot.com',
  trackAnalytics: true,
  useBasicAuth: false,
  alertDelayInSeconds: 7,
  mapApiKey: 'AIzaSyBMIoVYsqVdrlm_IwdKSkLEhpMH7JtEIT8',
  'ga': {
    'key': 'tempPwd',
    'iv': 'XXXX',
    'trackingId': 'UA-115890187-1'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
