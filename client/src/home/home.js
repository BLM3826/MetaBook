/* eslint-disable no-console */
import template from './home.html';
import './home.css';

export class homeController {
  constructor($log, $cookies) {
    this.$log = $log;
    this.$cookies = $cookies;
    this.user = null;
  }

  $onInit() {
    // get the user from the cookies
    this.user = this.$cookies.getObject('user');
    console.log(this.user);
  }

  userChanged(user) {
    this.user = user;
  }
}

homeController.$inject = ['$log', '$cookies'];

export default { controller: homeController, template };
