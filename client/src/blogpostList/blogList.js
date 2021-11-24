/* eslint-disable no-console */
import template from './blogList.html';
import postTemplate from '../blogpost/blogpostTemplate.html';
import './blogList.css';

const posts = [
  {
    id: 0,
    name: 'Bill',
    title: 'velit qui quis aliqua ea',
    content:
      'Adipisicing sunt dolore veniam culpa pariatur Lorem culpa enim. Est dolor sint aliquip aute esse ullamco nostrud qui.',
  },
  {
    id: 1,
    name: 'Bob',
    title: 'culpa anim nostrud pariatur esse',
    content:
      'Magna in qui laborum nulla irure ea dolor non irure duis amet. Dolore est consectetur elit do nostrud veniam enim ut consectetur.',
  },
  {
    id: 2,
    name: 'Bill',
    title: 'dolor anim consectetur eiusmod tempor',
    content:
      'Ad veniam cupidatat eu eiusmod amet enim laborum cillum commodo consectetur ipsum sit exercitation incididunt. Elit esse id elit est anim laboris veniam aliquip aute minim adipisicing labore ea.',
  },
  {
    id: 3,
    name: 'Joe',
    title: 'velit qui quis aliqua eaiam culpa pariatur Lorem culpa',
    content:
      'Adipisicing sunt dolore veniam culpa pariatur Lorem culpa enim. Est dolor sint aliquip aute esse ullamco nostrud qui.',
  },
];
export class blogListController {
  constructor($mdDialog, $log) {
    this.posts = posts;
    this.$mdDialog = $mdDialog;
    this.$log = $log;
  }
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

  openPost(post, ev) {
    const locals = { post };
    this.$mdDialog
      .show({
        controller: () => {},
        controllerAs: 'vm',
        locals,
        bindToController: true,
        template: postTemplate,
        clickOutsideToClose: true,
        hasBackdrop: true,
        targetEvent: ev
      })
      .catch((err) => {
        this.$log.error(err);
      });
  }
}

blogListController.$inject = ['$mdDialog', '$log'];

const bindings = {
//   post: '<',
};

export default { controller: blogListController, template, bindings };
