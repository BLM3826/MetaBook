/* eslint-disable no-console */
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import template from './blogpostEdit.html';
import './blogpostEdit.css';
import '../../node_modules/textangular/dist/textAngular.css';

export class blogPostEditController {
  constructor(
    $location,
    $resource,
    $route,
    $routeParams,
    $timeout,
    $mdToast,
    appService
  ) {
    this.$location = $location;
    this.$resource = $resource;
    this.$route = $route;
    this.$routeParams = $routeParams;
    this.$timeout = $timeout;
    this.$mdToast = $mdToast;
    this.appService = appService;
    this.postid = $routeParams.postid;
    this.editHeadline = 'Edit your Metapost';
    this.editButtonText = 'Update';
    this.post = {};
    this.loading = false;
    this.postTheme = !this.appService.isDark() ? 'my-post' : 'my-post-alt';
    this.btnTheme = !this.appService.isDark() ? 'editpagebtn' : 'editpagebtn-alt';
  }

  $onInit() {
    this.loading = false;
    if (this.$location.path() === '/add') {
      this.editHeadline = 'Make a Metapost';
      this.editButtonText = 'Add';
    } else {
      this.appService.getPostById(this.postid).then((post) => {
        this.post = post;
      });
    }
  }

  submitPost() {
    if (this.$location.path() === '/add') {
      this.post.name = this.user.username;
      this.appService.addPost(this.post).then(() => {
        this.loading = true;
      });
    } else {
      this.appService.updatePost(this.post, this.postid).then(() => {
        this.loading = true;
      });
    }
  }

  cancelEdit() {
    this.$location.path('/');
  }
}

blogPostEditController.$inject = [
  '$location',
  '$resource',
  '$route',
  '$routeParams',
  '$timeout',
  '$mdToast',
  'appService',
];

const bindings = {
  user: '<',
};

export default {
  controller: blogPostEditController,
  template,
  bindings,
};
