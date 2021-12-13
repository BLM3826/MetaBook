/* eslint-disable no-console */
export default class Service {
  /* @ngInject */
  constructor(
    $resource,
    $mdDialog,
    $mdToast,
    $cookies,
    $log,
    $timeout,
    $location,
    $route
  ) {
    this.$resource = $resource;
    this.$mdDialog = $mdDialog;
    this.$mdToast = $mdToast;
    this.$cookies = $cookies;
    this.$log = $log;
    this.$timeout = $timeout;
    this.$location = $location;
    this.$route = $route;
    this.posts = [];
  }

  // eslint-disable-next-line class-methods-use-this
  isDark() {
    return sessionStorage.getItem('theme') === 'dark';
  }

  displayToastMessage(message) {
    this.$mdToast.show(
      this.$mdToast
        .simple()
        .textContent(message)
        .position('top right')
        .hideDelay(3000)
    );
  }

  /**
   * Login/register functionality for user.
   *
   * @param {object} user
   * @param {boolean} isLogin
   * @returns {Promise<unknown>|*}
   */
  login(user, isLogin) {
    const { username, password } = user || {};
    const apiUrl = isLogin ? '/api/login' : '/api/register';
    // if admin, skip call to server
    if (username === 'admin' && password === 'admin') {
      this.$cookies.putObject('user', user);
      this.$mdDialog.hide(user);
      return Promise.resolve(user);
    }
    return this.$resource(apiUrl)
      .save({ username, password })
      .$promise.then(() => {
        const text = isLogin
          ? `Welcome ${username}`
          : 'Account created successfully';
        this.displayToastMessage(text);
        // store the user in cookie as json
        this.$cookies.putObject('user', user);
        this.$mdDialog.hide(user);
        return user;
      })
      .catch((err) => {
        this.$log.error(err);
        const textToDisplay = err.status === 401
          ? `User ${err.data}`
          : 'Error logging in please try again';
        this.displayToastMessage(textToDisplay);
        return null;
      });
  }

  /*   bloglist functionality in bloglist.js
      getBlogPosts(pagename) {
        this.$resource(
          `/api/blogposts/${pagename}`
        ).query()
          .$promise.then((res) => {
            this.posts = res;
            this.$log.info(this.posts);
            return this.posts;
          });
     } */

  // editpage functionality
  getPostById(id) {
    return this.$resource('/api/blogposts/:id').get({ id }, post => post);
  }

  addPost(post) {
    return (
      this.$resource('/api/blogposts')
        .save(post, () => {})
        // timeout to wait for the server to add the post
        .$promise.then(() => {
          this.$timeout(() => {
            this.$location.path('/');
            this.displayToastMessage('Post added successfully');
          }, 2000);
        })
    );
  }

  updatePost(post, id) {
    return (
      this.$resource(
        '/api/blogposts/:id',
        { id },
        { update: { method: 'PUT' } }
      )
        .update(post, () => {})
        // timeout to wait for the server to update the post
        .$promise.then(() => {
          this.$timeout(() => {
            this.$location.path('/');
            this.displayToastMessage('Post updated successfully');
          }, 2000);
        })
    );
  }

  // blogpost functionality
  deletePost(id) {
    this.$resource('/api/blogposts/:id')
      .delete({ id })
      .$promise.then(() => {
        this.$timeout(() => {
          this.$mdDialog.hide();
          this.$route.reload();
          this.displayToastMessage('Post deleted successfully');
        }, 1000);
      });
  }

  // header functionality
  logout() {
    this.$resource('/api/logout').save().$promise.then(() => {
      this.onUserChange({ user: null });
      this.$cookies.remove('user');
      this.displayToastMessage('Logged out successfully');
      this.$location.path('/');
    });
  }
}
// inject dependencies
Service.$inject = [
  '$resource',
  '$mdDialog',
  '$mdToast',
  '$cookies',
  '$log',
  '$timeout',
  '$location',
  '$route',
];
