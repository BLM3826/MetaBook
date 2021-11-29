/* eslint-disable no-console */
import template from './blogpost.html';
import './blogpost.css';

export class BlogpostComp {
  /* @ngInject */

  constructor($mdDialog) {
    this.$mdDialog = $mdDialog;
  }

  $onChanges() {
    console.log(this.post);
    console.log(this.user);
  }

  onInit() {
    // this.myPost = (this.user.username === this.post.name);
    console.log(this.post);
    console.log(this.user);
  }

  closePost() {
    this.$mdDialog.hide();
  }
}

const bindings = {
  post: '<',
  user: '<'
};

export default { controller: BlogpostComp, template, bindings };
