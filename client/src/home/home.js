/* eslint-disable no-console */
import template from './home.html';
import './home.css';

export class homeController {
  constructor($log) {
    // binding are not yet available here
    this.$log = $log; // init on constructor imported services to have access from 'this'
    this.user = null;
    // console.log(this.user);
  }

  $onChanges() {
    console.log(this.user);
  }

  $onInit() {
    console.log(this.user);
  }

  $postLink() {
    console.log(this.user);
  }

  //   $onDestroy() {
  //     // runs on component destroy
  //   }

  //   myFunction() {
  //     this.$log.info('Hi!!');
  //   }

  //   mySecondFunction() {
  //     this.myFunction();
  //   }

  userChanged(user) {
    this.user = user;
  }
}
homeController.$inject = ['$log'];
export default { controller: homeController, template };
