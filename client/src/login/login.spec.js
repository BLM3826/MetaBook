import { Login } from './login';

let login;
let rootScopeSpy;

beforeEach(() => {
  rootScopeSpy = jest.fn();
  login = new Login(rootScopeSpy);
});

it('should set headerText of rootScope on changeHeader', () => {
  login.changeHeader();
  expect(rootScopeSpy).toHaveProperty('headerText');
});
