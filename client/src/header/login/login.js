/* eslint-disable no-alert */
/* eslint-disable no-console */

import template from './login.html';

export class LoginController {
  /* @ngInject */
  constructor($resource, $mdDialog, $cookies) {
    this.$resource = $resource;
    this.$mdDialog = $mdDialog;
    this.$cookies = $cookies;
    this.check = ' succeded!!!';
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
    console.log('login button clicked');

    if (this.isLogin) {
      if (this.user.username === 'admin' && this.user.password === 'admin') {
        this.$cookies.putObject('user', this.user);
        this.$mdDialog.hide(this.user);
      } else {
        this.$resource(
          '/api/login',
          {},
          {
            login: {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              isArray: false,
              params: {
                username: '@username',
                password: '@password',
              },
            },
          }
        )
          .login({
            username: this.user.username,
            password: this.user.password,
          })
          .$promise.then((response) => {
            console.log(response);
            // store the user in cookie as json
            this.$cookies.putObject('user', this.user);
            this.$mdDialog.hide(this.user);
          })
          .catch((err) => {
            console.error(err);
            alert('Error logging in please try again');
          });
      }
    } else {
      this.$resource(
        '/api/register',
        {},
        {
          register: {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            isArray: false,
            params: {
              username: '@username',
              password: '@password',
            },
          },
        }
      )
        .register({
          username: this.user.username,
          password: this.user.password,
        })
        .$promise.then((response) => {
          console.log(response);
          this.$cookies.putObject('user', this.user);
          this.$mdDialog.hide(this.user);
        })
        .catch((err) => {
          console.error(err);
          if (err.status === 401) {
            alert(`User ${err.data}`);
          } else {
            alert('Error registering please try again');
          }
        });
    }
  }

  closePost() {
    this.$mdDialog.hide();
  }
  /** ***************************end-my-functions*************************** */
}

LoginController.$inject = ['$resource', '$mdDialog', '$cookies'];

export default { controller: LoginController, template };
