export default class ServiceMock {
  constructor() {
    this.getUser = jest.fn().mockResolvedValue({ data: { name: 'Test' } });
  }
}
