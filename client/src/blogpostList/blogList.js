/* eslint-disable no-console */
import template from './blogList.html';
import postTemplate from '../blogpost/blogpostTemplate.html';
import './blogList.css';

export class blogListController {
  constructor($mdDialog, $log, $resource, $location, $routeParams) {
    this.posts = [];
    this.$mdDialog = $mdDialog;
    this.$log = $log;
    this.$resource = $resource;
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.noPosts = false;
    this.theme = sessionStorage.getItem('theme');
  }

  $onInit() {
    this.pagename = this.$routeParams.username ? `user/${this.$routeParams.username}` : '';
    this.getBlogPosts();
  }

  getBlogPosts() {
    this.$resource(
      `/api/blogposts/${this.pagename}`
    ).query()
      .$promise.then((res) => {
        this.posts = res;
        this.noPosts = this.posts.length === 0;
      });
  }

  openPost(post, ev) {
    const locals = { post, user: this.user };
    this.$mdDialog
      .show({
        controller: () => {},
        controllerAs: 'vm',
        locals,
        bindToController: true,
        template: postTemplate,
        hasBackdrop: true,
        clickOutsideToClose: true,
        targetEvent: ev,
      })
      .catch((err) => {
        this.$log.error(err);
      });
  }

  editPost() {
    this.$location.path('/add');
  }
}

blogListController.$inject = ['$mdDialog', '$log', '$resource', '$location', '$routeParams'];

const bindings = {
  user: '<',
};

export default { controller: blogListController, template, bindings };
