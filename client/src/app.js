export class App {
  /* @ngInject */
  constructor($rootScope, service) {
    this.$rootScope = $rootScope;
    this.service = service;
  }

  $onInit() {
    this.$rootScope.headerText = 'Welcome in AngularJS component app !';
    this.service.getUser().then(({ data }) => {
      this.$rootScope.user = data;
    });
  }
}

export default {
  template: `
   <app-header user="$ctrl.$rootScope.user" text="$ctrl.$rootScope.headerText"></app-header>
   <ng-view></ng-view>
  `,
  controller: App,
};
