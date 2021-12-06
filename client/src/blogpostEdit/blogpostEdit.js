/* eslint-disable no-console */
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import template from './blogpostEdit.html';
import './blogpostEdit.css';

export class blogPostEditController {
  constructor($location, $resource, $route, $routeParams, $timeout) {
    this.$location = $location;
    this.$resource = $resource;
    this.$route = $route;
    this.$routeParams = $routeParams;
    this.$timeout = $timeout;
    this.postid = $routeParams.postid;
    this.editHeadline = 'Edit your Metapost';
    this.editButtonText = 'Update';
    this.post = {};
    this.loading = false;
  }

  $onInit() {
    this.loading = false;
    if (this.$location.path() === '/add') {
      this.editHeadline = 'Make a Metapost';
      this.editButtonText = 'Add';
    } else {
      this.getPostById(this.postid);
    }
  }

  // get the post data from the server by id
  getPostById(id) {
    this.$resource('/api/blogposts/:id').get({ id }, (post) => {
      this.post = post;
    });
  }

  submitPost() {
    if (this.$location.path() === '/add') {
      this.addPost();
    } else {
      this.updatePost();
    }
  }

  addPost() {
    this.post.name = this.user.username;
    console.log(this.post);
    this.$resource('/api/blogposts')
      .save(this.post, () => {
        console.log(this.post);
        console.log('added');
      })
      // timeout to wait for the server to add the post
      .$promise.then(() => {
        this.loading = true;
        this.$timeout(() => {
          this.$location.path('/');
        }, 2000);
      });
  }

  updatePost() {
    this.$resource(
      '/api/blogposts/:id',
      { id: this.postid },
      { update: { method: 'PUT' } }
    )
      .update(this.post, () => {
        console.log(this.post);
        console.log('updated');
      })
      // timeout to wait for the server to update the post
      .$promise.then(() => {
        this.loading = true;
        this.$timeout(() => {
          this.$location.path('/');
        }, 2000);
      });
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
];

const bindings = {
  //   post: '<',
  user: '<',
};

export default {
  controller: blogPostEditController, template, bindings
};
