/* eslint-disable no-console */
import template from './home.html';
import './home.css';

export class homeController {
  constructor($log, $cookies) {
    // binding are not yet available here
    this.$log = $log; // init on constructor imported services to have access from 'this'
    this.$cookies = $cookies;
    this.user = null;
  }

  $onChanges() {
    console.log(this.user);
  }

  $onInit() {
    // get the user from the cookies
    this.user = this.$cookies.getObject('user');
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
homeController.$inject = ['$log', '$cookies'];
export default { controller: homeController, template };
