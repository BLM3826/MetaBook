/* eslint-disable no-alert */
/* eslint-disable no-console */

import template from './login.html';
import { Service } from '../../service';

export class LoginController {
  /* @ngInject */
  constructor($resource, $mdDialog, $cookies, $mdToast) {
    this.$resource = $resource;
    this.$mdDialog = $mdDialog;
    this.$cookies = $cookies;
    this.$mdToast = $mdToast;
    this.isLogin = true;
    this.submitName = 'Login';
    this.toggleName = 'Sign up';
  }

  /** ***************************my-functions*************************** */

  flipLogin() {
    this.isLogin = !this.isLogin;
    this.submitName = this.isLogin ? 'Login' : 'Register';
    this.toggleName = this.isLogin ? 'Sign up' : 'Sign in';
  }

  // we will have only one function for login and register
  // that will be called from the login.html and will be toggled by isLogin

  login() {
    Service.login(this.user, this.isLogin);
  }

  closePost() {
    this.$mdDialog.hide();
  }
  /** ***************************end-my-functions*************************** */
}

LoginController.$inject = ['$resource', '$mdDialog', '$cookies', '$mdToast'];

export default { controller: LoginController, template };
