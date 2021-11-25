/* eslint-disable no-console */
import template from './header.html';
import connectTemplate from './login/login.html';
import './header.css';

export class headerController {
  constructor($mdDialog, $log) {
    this.$mdDialog = $mdDialog;
    this.$log = $log;
  }

  openConnect(ev) {
    this.$mdDialog
      .show({
        controller: () => {},
        controllerAs: 'vm',
        bindToController: true,
        template: connectTemplate,
        targetEvent: ev,
        clickOutsideToClose: true,
        hasBackdrop: true,
      })
      .catch((err) => {
        this.$log.error(err);
      });
  }
}

headerController.$inject = ['$mdDialog', '$log'];

const bindings = {
  text: '<',
  user: '<',
};

export default { controller: headerController, template, bindings };
