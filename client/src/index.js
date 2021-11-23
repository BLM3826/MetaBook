import angular from 'angular';
import ngRoute from 'angular-route';
import 'angular-material';
import 'angular-material/angular-material.css';
import service from './service';
import app from './app';
import home from './home/home';
import header from './header/header';
// import login from './login/login';
import blogpost from './blogpost/blogpost';
import blogpostedit from './blogpostEdit/blogpostEdit';
import bloglist from './blogpostList/blogList';
import blogpostPreview from './blogpostList/blogpostPreview/blogpostPreview';
import blogfooter from './footer/footer';

const mainModule = angular
  .module('mainModule', [ngRoute, 'ngMaterial'])
  .service('service', service)
  .component('appRoot', app)
  .component('appHome', home)
  .component('blogHeader', header)
  //   .component('appLogin', login)
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
          "<app-home message-from-parent=\"'Hi from router 🤗'\"></app-home>",
      })
      //   .when('/login', { template: '<app-login></app-login>' })
      .when('/edit', { template: '<app-blogpost-edit></app-blogpost-edit>' })
      .otherwise('/');
  });

angular.bootstrap(document, [mainModule.name], { strictDi: true });
