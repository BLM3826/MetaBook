import template from './blogpost.html';

export class BlogpostComp {
  /* @ngInject */
  constructor() {
    this.message = 'Hi from constructor';
    this.title = '';
    this.content = '';
    this.user = '';
  }
}

const bindings = {
//   messageFromParent: '<',
};

export default { controller: BlogpostComp, template, bindings };
