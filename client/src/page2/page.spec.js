import { Page2 } from './page2';

let page2;
let rootScopeSpy;

beforeEach(() => {
  rootScopeSpy = jest.fn();
  page2 = new Page2(rootScopeSpy);
});

it('should set headerText of rootScope on changeHeader', () => {
  page2.changeHeader();
  expect(rootScopeSpy).toHaveProperty('headerText');
});
