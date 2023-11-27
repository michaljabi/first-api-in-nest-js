import { CookieCheckMiddleware } from './cookie-check.middleware';

describe('CookieCheckMiddleware', () => {
  it('should be defined', () => {
    expect(new CookieCheckMiddleware()).toBeDefined();
  });
});
