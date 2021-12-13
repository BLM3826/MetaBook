/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import template from './blogpost.html';
import './blogpost.css';

export class BlogpostComp {
  /* @ngInject */

  constructor(
    $mdDialog,
    $location,
    $resource,
    $route,
    $timeout,
    $mdToast,
    $log,
    appService
  ) {
    this.$mdDialog = $mdDialog;
    this.$location = $location;
    this.$resource = $resource;
    this.$route = $route;
    this.$timeout = $timeout;
    this.$mdToast = $mdToast;
    this.$log = $log;
    this.appService = appService;
    this.likes = 0;
    this.postTheme = !this.appService.isDark() ? 'my-post' : 'my-post-alt';
  }

  likePost() {
    this.likes++;
  }

  editPost() {
    this.$location.path(`/edit/${this.post.id}`);
    this.$mdDialog.hide();
  }

  morePosts() {
    this.$location.path(`/${this.post.name}/posts`);
    this.$mdDialog.hide();
  }

  deletePost() {
    this.appService.deletePost(this.post.id);
  }

  closePost() {
    this.$mdDialog.hide();
  }
}

BlogpostComp.$inject = [
  '$mdDialog',
  '$location',
  '$resource',
  '$route',
  '$timeout',
  '$mdToast',
  '$log',
  'appService',
];

const bindings = {
  post: '<',
  user: '<',
};

export default { controller: BlogpostComp, template, bindings };
