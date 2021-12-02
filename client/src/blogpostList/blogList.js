/* eslint-disable no-console */
import template from './blogList.html';
import postTemplate from '../blogpost/blogpostTemplate.html';
import './blogList.css';

export class blogListController {
  constructor($mdDialog, $log, $resource, $location) {
    this.posts = [];
    this.$mdDialog = $mdDialog;
    this.$log = $log;
    this.$resource = $resource;
    this.$location = $location;
  }

  $onInit() {
    this.getBlogPosts();
    console.log(this.user);
  }
  //   $postLink() {
  //     // runs after onInit
  //   }
  //   $onChanges() {
  //     console.log(this.post);
  //     console.log(this.user);
  //   }
  //   $onDestroy() {
  //   }

  getBlogPosts() {
    this.$resource(
      '/api/blogposts',
      {},
      {
        blogposts: {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          isArray: true,
        },
      }
    )
      .blogposts({ posts: this.posts })
      .$promise.then((res) => {
        console.log(res);
        this.posts = res;
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

blogListController.$inject = ['$mdDialog', '$log', '$resource', '$location'];

const bindings = {
  user: '<',
};

export default { controller: blogListController, template, bindings };
