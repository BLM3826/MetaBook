import { Home } from './home';

let home;

beforeEach(() => {
  home = new Home();
});

it('should change message should remove name', () => {
  home.changeMessage();
  expect(home.message).toContain('!');
});
