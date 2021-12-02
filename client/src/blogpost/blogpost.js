/* eslint-disable no-console */
import template from './blogpost.html';
import './blogpost.css';

export class BlogpostComp {
  /* @ngInject */

  constructor($mdDialog, $location) {
    this.$mdDialog = $mdDialog;
    this.$location = $location;
  }

  $onChanges() {
    console.log(this.post);
    console.log(this.user);
  }

  $onInit() {
    // this.myPost = (this.user.username === this.post.name);
    console.log(this.post);
    console.log(this.user);
  }

  editPost() {
    this.$location.path(`/edit/${this.post.id}`);
    this.$mdDialog.hide();
  }

  closePost() {
    this.$mdDialog.hide();
  }
}

BlogpostComp.$inject = ['$mdDialog', '$location'];

const bindings = {
  post: '<',
  user: '<'
};

export default { controller: BlogpostComp, template, bindings };
