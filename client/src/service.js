/* eslint-disable no-console */
export class Service {
  /* @ngInject */
  constructor($resource, $mdDialog, $mdToast, $cookies) {
    this.resource = $resource;
    this.mdDialog = $mdDialog;
    this.mdToast = $mdToast;
    this.cookies = $cookies;
  }

  login(data, isLogin) {
    const { username, password } = data || {};
    if (isLogin) {
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
}
// inject dependencies
Service.$inject = ['$resource', '$cookies', '$mdDialog', '$mdToast'];

export default { service: 'Service', name: 'service' };
