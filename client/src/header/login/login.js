/* eslint-disable no-alert */
/* eslint-disable no-console */

import template from './login.html';

export class LoginController {
  /* @ngInject */
  constructor($rootScope) {
    this.$rootScope = $rootScope;
    this.check = ' succeded!!!';
    this.isLogin = true;
  }

  /** ***************************my-functions*************************** */

  flipLogin() {
    console.log(this.isLogin);
    this.isLogin = !this.isLogin;
  }

  // we will have only one function for login and register
  // that will be called from the login.html and will be toggled by isLogin

  login() {
    console.log('login button clicked');

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: document.getElementById('lgnusername').value,
        // email: this.state.email,
        password: document.getElementById('lgnpassword').value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          // redirect to Login.html
          //   window.location.href = '/Login';
          console.log(`login${this.check}`);
          this.$rootScope.isLoggedIn = true;
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error logging in please try again');
      });
  }

  // $resource('/api/login', {}, {
  //     login: {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         isArray: false,
  //         params: {
  //             username: '@username',
  //             password: '@password',
  //         },
  //     },
  // }).login({
  //     username: document.getElementById('lgnusername').value,
  //     password: document.getElementById('lgnpassword').value,
  // }).$promise.then((response) => {
  //     console.log(response);
  //     console.log(`login${this.check}`);
  // }).catch((err) => {
  //     console.error(err);
  //     alert('Error logging in please try again');
  // });

  register() {
    console.log('register button clicked');

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: document.getElementById('rgsusername').value,
        // email: this.state.email,
        password: document.getElementById('rgspassword').value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          // redirect to Login.html
          //   window.location.href = '/Login';
          console.log(`register${this.check}`);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error registering please try again');
      });
  }

  // $resource('/api/register', {}, {
  //     register: {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         isArray: false,
  //         params: {
  //             username: '@username',
  //             password: '@password',
  //         },
  //     },
  // }).register({
  //     username: document.getElementById('rgsusername').value,
  //     password: document.getElementById('rgspassword').value,
  // }).$promise.then((response) => {
  //     console.log(response);
  //     console.log(`register${this.check}`);
  // }).catch((err) => {
  //     console.error(err);
  //     alert('Error registering please try again');
  // });

  /** ***************************end-my-functions*************************** */
}

export default { controller: LoginController, template };
