/*jshint esversion: 6 */

import { appModule } from './app/main.module';

import './style.scss';

angular.bootstrap(document.body, [appModule], { strictDi: true });
