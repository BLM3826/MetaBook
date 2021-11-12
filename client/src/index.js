import angular from 'angular';
import ngRoute from 'angular-route';

import service from './service';
import app from './app';
import home from './home/home';
import header from './header/header';
import page2 from './page2/page2';

const mainModule = angular.module('mainModule', [ngRoute])
  .service('service', service)
  .component('appRoot', app)
  .component('appHome', home)
  .component('appHeader', header)
  .component('appPage2', page2)
  .config(($locationProvider, $routeProvider) => {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', { template: '<app-home message-from-parent="\'Hi from router 🤗\'"></app-home>' })
      .when('/page2', { template: '<app-page-2></app-page-2>' })
      .otherwise('/');
  });

angular.bootstrap(document, [mainModule.name], { strictDi: true });
