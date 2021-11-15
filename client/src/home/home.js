/* eslint-disable no-alert */
/* eslint-disable no-console */
import template from './home.html';

export class Home {
  /* @ngInject */
  constructor() {
    this.message = 'Hi from constructor';
    this.check = 'login succeded!!!';
  }

  changeMessage() {
    this.message = `${this.message} !`;
  }

  /** ***************************my-functions*************************** */

  login() {
    console.log('login button clicked');

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: document.getElementById('lgnusername').value,
        // email: this.state.email,
        password: document.getElementById('lgnpassword').value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          // redirect to page2.html
        //   window.location.href = '/page2';
          console.log(this.check);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error logging in please try again');
      });
  }

  register() {
    console.log('register button clicked');

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: document.getElementById('rgsusername').value,
        // email: this.state.email,
        password: document.getElementById('rgspassword').value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          // redirect to page2.html
        //   window.location.href = '/page2';
          console.log(this.check);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error registering please try again');
      });
  }

  /** ***************************end-my-functions*************************** */
}

const bindings = {
  messageFromParent: '<',
};

export default { controller: Home, template, bindings };
