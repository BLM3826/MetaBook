/* eslint-disable no-console */
import template from './header.html';
import loginTemplate from './login/loginTemplate.html';
import './header.css';

export class headerController {
  constructor($mdDialog, $log, $mdPanel, $resource, $cookies, $location) {
    this.$mdDialog = $mdDialog;
    this.$log = $log;
    this.$mdPanel = $mdPanel;
    this.$resource = $resource;
    this.$cookies = $cookies;
    this.$location = $location;
  }

  $onInit() {
    console.log(this.user);
  }


  openLogin(ev) {
    // const position = this.$mdPanel.newPanelPosition()
    //   .absolute()
    //   .right()
    //   .top();

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
    console.log(this.$mdDialog);
  }

  userPosts() {
    this.$location.path(`/${this.user.username}/posts`);
  }

  logout() {
    this.$resource('/api/logout').save().$promise.then((res) => {
      this.onUserChange({ user: null });
      this.$cookies.remove('user');
      console.log('logged out', res);
    });
  }
}

headerController.$inject = ['$mdDialog', '$log', '$mdPanel', '$resource', '$cookies', '$location'];

const bindings = {
  text: '<',
  user: '<',
  onUserChange: '&',
};

export default { controller: headerController, template, bindings };
