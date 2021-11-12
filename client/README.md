# angularjs-webpack-simple

## Component approach

These boilerplate is based on the component approach added in AngularJS 1.5, a first step towards Angular.

## A new component

#### Create it

Create a new folder in src named newComponent with an .html, a .js and a .css file (if needed)

```html
<div class="jumbotron">
  <h1 class="text-primary">{{$ctrl.message}}</h1>
  <h3>{{$ctrl.messageFromParent}}</h3>
</div>
<button class="btn btn-primary" ng-click="$ctrl.changeMessage()">Change</button>
```

```javascript
import './newComponent.css'; // If needed, to be added in webpack bundle
import template from './newComponent.html';

export class NewComponent {
  /* @ngInject */ // Required to keep dependency injection after minification
  constructor(service) {
    this.message = '';
    this.service = service;
  }

  $onInit() {
    // this.messageFromParent available
  }

  getMessage() {
    this.message = this.service.getMessage();
  }
}

/* Properties that can be bind to the controller
  '=' : Two-way data-binding : A change in child will reflect in parent
  '<' : One-way data-binding : A change in child will NOT reflect in parent
  Be careful, these values are not available in constructor
*/
const bindings = {
  messageFromParent: '<',
};

// Export of the component
export default { controller: NewComponent, template, bindings };
 ```

#### Register it

In index.js, add these two lines :

```javascript
// other imports
import newComponent from './newComponent/newComponent';

const mainModule = angular.module('mainModule', [/* dependencies */])
  // other components
  .component('appNewComponent', newComponent)
```

#### Use it

You can use it in other components or in index.html :

```html
<!-- props are evaluate as JS, so you can pass a variable -->
<app-new-component message-from-parent="'Hi from parent !'"></app-new-component>
```

or as the main component of a route : 

```javascript
$routeProvider
  // other routes
  .when('/newRoute', { 
    template: '<app-new-component message-from-parent="\'Hi from router 🤗\'"></app-new-component>'
  })
```

## Communication between components

The AngularJS $rootScope is very good way to get a store in our app. It's initialized in the app.js and the values can be accessed and changed in any controller.

## A new service

#### Create it

```javascript
export default class NewService {
  /* @ngInject */ // Required to keep dependency injection after minification
  constructor($http) {
    this.$http = $http;
  }
  
  getUser(id) {
    return this.$http.get(`api/users/${id}`);
  }
}
```

> If the service is used only by one component, you can put it in the component folder

#### Register it

In index.js, add these two lines :

```javascript
// other imports
import newService from './newService';

const mainModule = angular.module('mainModule', [/* dependencies */])
  // components
  .service('newService', newService)
```

#### Use it

The service can now be used in a controller.

```javascript
$onInit() {
  this.service.getUser(this.userId).then(({ data }) => {
    this.user = data;
  });
}
```

## Build

`npm run build`

## Unit tests

`npm test`

[Jest](https://facebook.github.io/jest/) is used as test-runner, assertion library and mock library. A good practice is to put test files in the component folder with the .spec.js extension.

## End-to-end tests

`npm run e2e`

End-to-end tests run on Chromium with [Puppeteer](https://github.com/GoogleChrome/puppeteer). It can be headless or not (`npm run e2e:debug`).

They run in parallels in different tabs against built sources, served with [serve](https://github.com/zeit/serve).

## Lint

`npm run lint`

ESLint is used and extend [the Airbnb style](https://github.com/airbnb/javascript). It prevents from some mistakes (undef or unused variables) and help to keep a clean git history (comma-dangle, eol-last, ...). The configuration is in the package.json file. `npm run lint` will run eslint on all source files and automatically fix most problems.

## Proxy

You can use the [devserver-proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy) to either redirect to another port (```target: 'http://localhost:3000'```) or mock data with the bypass function.
