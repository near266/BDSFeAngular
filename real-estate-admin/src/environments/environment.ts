// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  tokenEx: 43199,
  refreshTokenEx: 43199,
  clientId: 'YnJvd3NlcjoxMjM0',
  baseUrl: 'https://api-bds.eztek.net/',
  basePath: 'api/',
  logServer: false,
  logClient: true,
  version: '1.0.0',
  mediaUrl: 'http://192.168.1.44:10023/upload/',
  clientTimeout: 10000, // 10s
  importExportTimeout: 300000, // 5m
  idleTimeout: 1800
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
