
import template from './home.html';

export class Home {
  /* @ngInject */
  constructor() {
    this.message = 'Hi from constructor';
  }

  changeMessage() {
    this.message = `${this.message} !`;
  }
}

const bindings = {
  messageFromParent: '<',
};

export default { controller: Home, template, bindings };
