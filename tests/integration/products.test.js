const request = require('supertest');
const app = require('../../src/app');
require('dotenv/config');

describe('Testing products CRUD', () => {
  it('A list of products should be returned', async () => {
    await request(app).get('/api/products').expect(200);
  });
});
