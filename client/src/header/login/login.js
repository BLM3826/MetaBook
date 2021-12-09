/* eslint-disable no-alert */
/* eslint-disable no-console */

import template from './login.html';

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
    const { username, password } = this.user || {};
    if (this.isLogin) {
      if (username === 'admin' && password === 'admin') {
        this.$cookies.putObject('user', this.user);
        this.$mdDialog.hide(this.user);
      } else {
        this.$resource('/api/login')
          .save({ username, password })
          .$promise.then(() => {
            // make a toast
            this.$mdToast.show(
              this.$mdToast
                .simple()
                .textContent(`Welcome ${username}`)
                .position('top right')
                .hideDelay(3000)
            );
            // store the user in cookie as json
            this.$cookies.putObject('user', this.user);
            this.$mdDialog.hide(this.user);
          })
          .catch((err) => {
            console.error(err);
            this.$mdToast.show(
              this.$mdToast
                .simple()
                .textContent('Error logging in please try again')
                .position('top right')
                .hideDelay(3000)
            );
          });
      }
    } else {
      this.$resource('/api/register')
        .save({ username, password })
        .$promise.then(() => {
          // make a toast
          this.$mdToast.show(
            this.$mdToast
              .simple()
              .textContent('Account created successfully')
              .position('top right')
              .hideDelay(3000)
          );
          this.$cookies.putObject('user', this.user);
          this.$mdDialog.hide(this.user);
        })
        .catch((err) => {
          console.error(err);
          if (err.status === 401) {
            this.$mdToast.show(
              this.$mdToast
                .simple()
                .textContent(`User ${err.data}`)
                .position('top right')
                .hideDelay(3000)
            );
          } else {
            this.$mdToast.show(
              this.$mdToast
                .simple()
                .textContent('Error logging in please try again')
                .position('top right')
                .hideDelay(3000)
            );
          }
        });
    }
  }

  closePost() {
    this.$mdDialog.hide();
  }
  /** ***************************end-my-functions*************************** */
}

LoginController.$inject = ['$resource', '$mdDialog', '$cookies', '$mdToast'];

export default { controller: LoginController, template };
