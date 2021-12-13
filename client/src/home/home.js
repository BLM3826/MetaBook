/* eslint-disable no-console */
import template from './home.html';
import './home.css';

export class homeController {
  constructor($log, $cookies, $window, $mdToast) {
    this.$log = $log;
    this.$cookies = $cookies;
    this.$window = $window;
    this.$mdToast = $mdToast;
    this.user = null;
    this.theme = sessionStorage.getItem('theme') || 'default';
  }

  $onInit() {
    // get the user from the cookies
    this.user = this.$cookies.getObject('user');
    this.$mdToast.show(
      this.$mdToast
        .simple()
        .textContent(`${this.theme} mode`)
        .position('top right')
        .hideDelay(500)
    );
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
homeController.$inject = ['$log', '$cookies', '$window', '$mdToast'];

export default { controller: homeController, template };
