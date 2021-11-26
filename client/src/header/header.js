/* eslint-disable no-console */
import template from './header.html';
import loginTemplate from './login/loginTemplate.html';
import './header.css';

export class headerController {
  constructor($mdDialog, $log, $mdPanel) {
    this.$mdDialog = $mdDialog;
    this.$log = $log;
    this.$mdPanel = $mdPanel;
  }


  openConnect(ev) {
    const position = this.$mdPanel.newPanelPosition()
      .absolute()
      .right()
      .top();
    this.$mdDialog
      .show({
        controller: () => {},
        controllerAs: 'vm',
        bindToController: true,
        template: loginTemplate,
        targetEvent: ev,
        position,
        clickOutsideToClose: true,
        hasBackdrop: true,
      })
      .catch((err) => {
        this.$log.error(err);
      });
  }
}

headerController.$inject = ['$mdDialog', '$log', '$mdPanel'];

const bindings = {
  text: '<',
  user: '<',
};

export default { controller: headerController, template, bindings };
