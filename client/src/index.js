/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import angular from 'angular';
import ngRoute from 'angular-route';
import ngResource from 'angular-resource';
import 'angular-cookies';
import 'angular-material';
import 'angular-material/angular-material.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/brands.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'textangular/dist/textAngular.css';
import 'textangular/dist/textAngular-sanitize.min';
import 'textangular/dist/textAngular.min';
import service from './service';
import home from './home/home';
import header from './header/header';
import login from './header/login/login';
import blogpost from './blogpost/blogpost';
import blogpostedit from './blogpostEdit/blogpostEdit';
import bloglist from './blogpostList/blogList';
import blogpostPreview from './blogpostList/blogpostPreview/blogpostPreview';
import blogfooter from './footer/footer';

const mainModule = angular
  .module('mainModule', [
    ngRoute,
    ngResource,
    'ngCookies',
    'ngMaterial',
    'textAngular',
  ]).config(() => {
    angular.lowercase = angular.$$lowercase;
  })
  .service('service', service)
  .component('appHome', home)
  .component('blogHeader', header)
  .component('blogLogin', login)
  .component('blogpost', blogpost)
  .component('blogpostEdit', blogpostedit)
  .component('blogList', bloglist)
  .component('blogpostPreview', blogpostPreview)
  .component('blogFooter', blogfooter)
  .config(($locationProvider, $routeProvider) => {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        template:
          '<blog-list flex layout="column" layout-align="space-between" user="$ctrl.user"></blog-list>',
      })
      .when('/:username/posts', {
        template:
          '<blog-list flex layout="column" layout-align="space-between" layout-fill="" user="$ctrl.user"></blog-list>',
      })
      .when('/edit/:postid', {
        template:
          '<blogpost-edit flex layout="column" layout-align="space-between" user="$ctrl.user"></blogpost-edit>',
      })
      .when('/add', {
        template:
          '<blogpost-edit flex layout="column" layout-align="space-between" user="$ctrl.user"></blogpost-edit>',
      })
      .otherwise('/');
  })
  .config(($mdThemingProvider) => {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('blue')
      .accentPalette('orange')
      .warnPalette('red')
      .backgroundPalette('grey');
  })
  .config(($mdIconProvider) => {
    $mdIconProvider.defaultFontSet('FontAwesome').fontSet('fa', 'FontAwesome');
  })
  .config(($cookiesProvider) => {
    $cookiesProvider.defaults.path = '/';
  })
  .run(($rootScope, $location, $cookies) => {
    $rootScope.$on('$routeChangeStart', () => {
      if (!$cookies.getObject('user')) {
        $location.path('/');
      }
    });
  });

angular.bootstrap(document, [mainModule.name], { strictDi: true });
