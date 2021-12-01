/* eslint-disable no-console */
import template from './blogpostEdit.html';

export class blogPostEditController {
  constructor($location) {
    this.$location = $location;
    this.editHeadline = 'Make a Metapost';
    this.editButtonText = 'Add';
  }
  //   $onInit() {
  //     // binding available here
  // change the data from create to edit
  // this.editHeadline = 'Edit a Metapost';
  // this.editButtonText = 'update';
  // change also the input field values to none
  // }
  //   $postLink() {
  //     // runs after onInit
  //   }
  //   $onChanges(changesObj) {
  //   }

  cancelEdit() {
    this.$location.path('/');
  }

  //   $onDestroy() {
  //   }
}

blogPostEditController.$inject = ['$location'];

const bindings = {
  post: '<',
  user: '<',
};

export default { controller: blogPostEditController, template, bindings };
