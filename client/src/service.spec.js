import Service from './service';

let service;
let httpMock;

beforeEach(() => {
  httpMock = {
    get: jest.fn(),
  };
  service = new Service(httpMock);
});

it('should call $http.get', () => {
  service.getUser();
  expect(httpMock.get).toHaveBeenCalledTimes(1);
});
