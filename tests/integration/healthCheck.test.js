const request = require('supertest');
const app = require('../../src/app');
const HTTPStatus = require('../../src/helpers/HTTP.status');

describe('Testing Health Check', () => {
  describe('A request to health check', () => {
    it.only('should return code 200 and OK! message', async () => {
      const response = await request(app)
        .get('/health-check')
        .expect(HTTPStatus.OK);

      expect(response.text).toBe('OK!');
    });
  });
});
