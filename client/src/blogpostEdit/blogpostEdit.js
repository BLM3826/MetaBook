/* eslint-disable no-console */
import template from './blogpostEdit.html';

export class blogPostEditController {
  constructor($location, $resource, $route, $routeParams) {
    this.$location = $location;
    this.$resource = $resource;
    this.$route = $route;
    this.$routeParams = $routeParams;
    this.editHeadline = 'Edit your Metapost';
    this.editButtonText = 'Update';
  }

  $onInit() {
    console.log(this.$location.path());
    console.log(this.$route.current);
    console.log(this.$routeParams.id);

    if (this.$location.path() === '/add') {
      this.editHeadline = 'Make a Metapost';
      this.editButtonText = 'Add';
    }
    // this.getPostById(this.$location.search().id);
  }
  // change also the input field values to none

  // get the post data from the server by id
  //   getPostById(id) {
  //     // this.$resource('/api/blogposts/:id').get({ id }, (post) => {
  //     //   this.post = post;
  //     // });
  //   }


  cancelEdit() {
    this.$location.path('/');
  }

  //   $onDestroy() {
  //   }
}

blogPostEditController.$inject = ['$location', '$resource', '$routeParams', '$route'];

const bindings = {
  post: '<',
  user: '<',
};

export default { controller: blogPostEditController, template, bindings };
