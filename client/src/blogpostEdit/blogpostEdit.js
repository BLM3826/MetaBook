import template from './blogpostEdit.html';

export class blogPostEditController {
  //   constructor() {
  //   }
  //   $onInit() {
  //     // binding available here
  //   }
  //   $postLink() {
  //     // runs after onInit
  //   }
  //   $onChanges(changesObj) {
  //   }
  //   $onDestroy() {
  //   }
}

const bindings = {
  post: '<',
  user: '<',
};

export default { controller: blogPostEditController, template, bindings };
