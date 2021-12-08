/* eslint-disable no-console */
import template from './header.html';
import loginTemplate from './login/loginTemplate.html';
import './header.css';

export class headerController {
  constructor($mdDialog, $log, $mdPanel, $resource, $cookies, $location, $window) {
    this.$mdDialog = $mdDialog;
    this.$log = $log;
    this.$mdPanel = $mdPanel;
    this.$resource = $resource;
    this.$cookies = $cookies;
    this.$location = $location;
    this.$window = $window;
  }

  $onInit() {
    sessionStorage.setItem('theme', this.theme);
  }

  // switch theme to dark
  switchTheme() {
    console.log('switching theme');
    this.theme = this.theme === 'default' ? 'dark' : 'default';
    this.onThemeChange({ theme: this.theme });
  }

  openLogin(ev) {
    this.$mdDialog
      .show({
        controller: () => { },
        controllerAs: 'vm',
        bindToController: true,
        template: loginTemplate,
        targetEvent: ev,
        // position,
        clickOutsideToClose: true,
        hasBackdrop: true,
      }).then((user) => {
        this.onUserChange({ user });
      })
      .catch((err) => {
        this.$log.error(err);
      });
  }

  userPosts() {
    this.$location.path(`/${this.user.username}/posts`);
  }

  logout() {
    this.$resource('/api/logout').save().$promise.then((res) => {
      this.onUserChange({ user: null });
      this.$cookies.remove('user');
      console.log('logged out', res);
      this.$location.path('/');
    });
  }
}

headerController.$inject = ['$mdDialog', '$log', '$mdPanel', '$resource', '$cookies', '$location', '$window'];

const bindings = {
  text: '<',
  user: '<',
  theme: '<',
  onUserChange: '&',
  onThemeChange: '&',
};

export default { controller: headerController, template, bindings };
