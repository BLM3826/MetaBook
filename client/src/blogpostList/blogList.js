import template from './blogList.html';
import './blogList.css';

const userArray = ['Bill', 'Joe', 'George', 'Mark'];
const titleArray = [
  'This is a blogpost title',
  'This is a blogpost title',
  'This is a blogpost title',
  'This is a blogpost title',
];

export class blogListController {
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

export default { controller: blogListController, template };
