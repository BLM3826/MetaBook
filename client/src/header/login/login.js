/* eslint-disable no-alert */
/* eslint-disable no-console */

import template from './login.html';

export class LoginController {
  /* @ngInject */
  constructor($scope, $resource) {
    this.$scope = $scope;
    this.$resource = $resource;
    this.check = ' succeded!!!';
    this.isLogin = true;
    this.submitName = 'Login';
    this.toggleName = 'Sign up';
  }

  /** ***************************my-functions*************************** */

  flipLogin() {
    console.log(this.isLogin);
    this.isLogin = !this.isLogin;

    this.submitName = this.isLogin ? 'Login' : 'Register';
    this.toggleName = this.isLogin ? 'Sign up' : 'Sign in';
  }

  // we will have only one function for login and register
  // that will be called from the login.html and will be toggled by isLogin

  login() {
    console.log('login button clicked');

    if (this.isLogin) {
      console.log('login');
      console.log(this.user); // it gives undefined
      if (this.$scope.user.username === 'admin' && this.$scope.user.password === 'admin') {
        console.log(`admin${this.check}`);
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
            username: this.$scope.user.username,
            password: this.$scope.user.password,
          })
          .$promise.then((response) => {
            console.log(response);
            console.log(`login${this.check}`);
          })
          .catch((err) => {
            console.error(err);
            alert('Error logging in please try again');
          });
      }
    } else {
      console.log('register');

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
          username: this.$scope.user.username,
          password: this.$scope.user.password,
        })
        .$promise.then((response) => {
          console.log(response);
          console.log(`register${this.check}`);
        })
        .catch((err) => {
          console.error(err);
          alert('Error registering please try again');
        });
    }
  }
  /** ***************************end-my-functions*************************** */
}

LoginController.$inject = ['$scope', '$resource'];

export default { controller: LoginController, template };


// fetch('/api/login', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     username: document.getElementById('lgnusername').value,
//     password: document.getElementById('lgnpassword').value,
//   }),
// })
//   .then((res) => {
//     if (res.status === 200) {
//       // redirect to Login.html
//       //   window.location.href = '/Login';
//       console.log(`login${this.check}`);
//       this.$rootScope.isLoggedIn = true;
//     } else {
//       const error = new Error(res.error);
//       throw error;
//     }
//   })
//   .catch((err) => {
//     console.error(err);
//     alert('Error logging in please try again');
//   });

// fetch('/api/register', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     username: document.getElementById('lgnusername').value,
//     password: document.getElementById('lgnpassword').value,
//   }),
// })
//   .then((res) => {
//     if (res.status === 200) {
//       // redirect to Login.html
//       //   window.location.href = '/Login';
//       console.log(`register${this.check}`);
//     } else {
//       const error = new Error(res.error);
//       throw error;
//     }
//   })
//   .catch((err) => {
//     console.error(err);
//     alert('Error registering please try again');
//   });
