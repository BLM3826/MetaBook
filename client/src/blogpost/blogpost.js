/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import template from './blogpost.html';
import './blogpost.css';

export class BlogpostComp {
  /* @ngInject */

  constructor($mdDialog, $location, $resource, $route, $timeout) {
    this.$mdDialog = $mdDialog;
    this.$location = $location;
    this.$resource = $resource;
    this.$route = $route;
    this.$timeout = $timeout;
    this.likes = 0;
    this.postTheme = sessionStorage.getItem('theme') === 'default' ? 'my-post' : 'my-post-alt';
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
    // delete post from server
    this.$resource('/api/blogposts/:id')
      .delete({ id: this.post.id })
      .$promise.then(() => {
        this.$timeout(() => {
          this.$mdDialog.hide();
          this.$route.reload();
        }, 1000);
      });
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
];

const bindings = {
  post: '<',
  user: '<',
};

export default { controller: BlogpostComp, template, bindings };
