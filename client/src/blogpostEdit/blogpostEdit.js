import template from './blogpostEdit.html';

export class blogPostEditController {
  constructor($location) {
    this.$location = $location;
  }
  //   $onInit() {
  //     // binding available here
  //   }
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
