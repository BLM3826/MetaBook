/* eslint-disable no-console */
import template from './home.html';
import './home.css';

export class homeController {
  constructor($log, $cookies, $window) {
    this.$log = $log;
    this.$cookies = $cookies;
    this.$window = $window;
    this.user = null;
    this.theme = sessionStorage.getItem('theme') || 'default';
  }

  $onInit() {
    // get the user from the cookies
    this.user = this.$cookies.getObject('user');
    console.log(this.user);
  }

  userChanged(user) {
    this.user = user;
  }

  themeChanged(theme) {
    this.theme = theme;
    console.log(this.theme);
    sessionStorage.setItem('theme', this.theme);
    this.$window.location.reload();
  }
}
homeController.$inject = ['$log', '$cookies', '$window'];

export default { controller: homeController, template };
