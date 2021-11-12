export default class Service {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  getUser() {
    return this.$http.get('api/user');
  }
}
