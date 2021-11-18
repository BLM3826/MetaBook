import angular from 'angular';
import ngRoute from 'angular-route';

import service from './service';
import app from './app';
import home from './home/home';
import header from './header/header';
import login from './login/login';
import blogpost from './blogpost/blogpost';

const mainModule = angular
  .module('mainModule', [ngRoute])
  .service('service', service)
  .component('appRoot', app)
  .component('appHome', home)
  .component('appHeader', header)
  .component('appLogin', login)
  .component('appBlogpost', blogpost)
  .config(($locationProvider, $routeProvider) => {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        template:
          "<app-home message-from-parent=\"'Hi from router 🤗'\"></app-home>",
      })
      .when('/login', { template: '<app-login></app-login>' })
      .otherwise('/');
  });

angular.bootstrap(document, [mainModule.name], { strictDi: true });
