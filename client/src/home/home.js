/* eslint-disable no-console */
import template from './home.html';
import './home.css';

export class homeController {
  constructor($log, $cookies, $window, $mdToast, appService) {
    this.$log = $log;
    this.$cookies = $cookies;
    this.$window = $window;
    this.$mdToast = $mdToast;
    this.appService = appService;
    this.user = null;
    this.theme = sessionStorage.getItem('theme') || 'default';
  }

  $onInit() {
    // get the user from the cookies
    this.user = this.$cookies.getObject('user');
    this.appService.displayToastMessage(`${this.theme} mode`);
  }

  userChanged(user) {
    this.user = user;
  }

  themeChanged(theme) {
    this.theme = theme;
    sessionStorage.setItem('theme', this.theme);
    this.$window.location.reload();
  }
}
homeController.$inject = ['$log', '$cookies', '$window', '$mdToast', 'appService'];

export default { controller: homeController, template };
