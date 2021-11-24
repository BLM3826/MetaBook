import template from './blogpost.html';
import './blogpost.css';

export class BlogpostComp {
  /* @ngInject */
  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
  }

  closePost() {
    this.$mdDialog.hide();
  }
}

const bindings = {
  post: '<',
  //   onDelete: '&',
  //   onEdit: '&',
};

export default { controller: BlogpostComp, template, bindings };
