import template from './page2.html';

export class Page2 {
  /* @ngInject */
  constructor($rootScope) {
    this.$rootScope = $rootScope;
  }

  changeHeader() {
    this.$rootScope.headerText = 'AngularJS is awesome !';
  }
}

export default { controller: Page2, template };
