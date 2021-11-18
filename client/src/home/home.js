import template from './home.html';

export class homeController {
  constructor($log) {
    // binding are not yet available here
    this.$log = $log; // init on constructor imported services to have access from 'this'
    this.isLoggedIn = false;
  }

  //   $onChanges() {
  //     // runs before onInit and every time bindings change
  //   }

  //   $onInit() {
  //     // binding available here
  //   }

  //   $postLink() {
  //     // runs after onInit
  //   }

  //   $onDestroy() {
  //     // runs on component destroy
  //   }

  myFunction() {
    this.$log.info('Hi!!');
  }

  mySecondFunction() {
    this.myFunction();
  }
}
homeController.$inject = ['$log'];
export default { controller: homeController, template };
