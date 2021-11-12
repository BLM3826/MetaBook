import { App } from './app';
import ServiceMock from '../__mocks__/service';

let app;

beforeEach(() => {
  app = new App(jest.fn(), new ServiceMock());
  app.$onInit();
});

it('should call getUser on init', () => {
  expect(app.service.getUser).toHaveBeenCalledTimes(1);
});

it('should set user in $rootScope', () => {
  expect(app.$rootScope).toHaveProperty('user');
});
