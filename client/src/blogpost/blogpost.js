import template from './blogpost.html';
import './blogpost.css';

export class BlogpostComp {
  /* @ngInject */

}

const bindings = {
  post: '<',
  //   onDelete: '&',
  //   onEdit: '&',
};

export default { controller: BlogpostComp, template, bindings };
