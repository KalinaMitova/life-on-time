import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if ( environment.production ) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule( AppModule );



// "/auth/login": {
//   "target": "http://136.244.71.69",
//     "secure": false

// },
// "/me": {
//   "target": "http://136.244.71.69",
//     "secure": false

// },
// "/api/applicationtypes": {
//   "target": "http://136.244.71.69",
//     "secure": false

// },
// "/auth/logout": {
//   "target": "http://136.244.71.69",
//     "secure": false

// },
// "/api/me/tasks": {
//   "target": "http://136.244.71.69",
//     "secure": false
// },
// "/api/me/tasks/completed": {
//   "target": "http://136.244.71.69",
//     "secure": false
// },
// "/api/me/tasks/dayscompletelastaction": {
//   "target": "http://136.244.71.69",
//     "secure": false
// },
// "/api/tasks/{id}": {
//   "target": "http://136.244.71.69",
//     "secure": false
// },
// "/api/me/goals": {
//   "target": "http://136.244.71.69",
//     "secure": false
// },
// "/api/me/goals/completed": {
//   "target": "http://136.244.71.69",
//     "secure": false
// },
// "/api/me/goals/fromideas": {
//   "target": "http://136.244.71.69",
//     "secure": false
// },
// "/api/me/goals/rate": {
//   "target": "http://136.244.71.69",
//     "secure": false
// },
// "/api/goals/{id}": {
//   "target": "http://136.244.71.69",
//     "secure": false
// },
// "/api/me/goals/bycategoryall": {
//   "target": "http://136.244.71.69",
//     "secure": false
// },

// "/api/me/ideas": {
//   "target": "http://136.244.71.69",
//     "secure": false
// }
