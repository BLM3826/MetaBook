import template from './blogpost.html';

export class BlogpostComp {
  /* @ngInject */
  constructor() {
    this.title = '';
    this.content = '';
    this.user = '';
  }
}

const bindings = {
  blogpost: '<',
  onDelete: '&',
  onEdit: '&',
};

export default { controller: BlogpostComp, template, bindings };
