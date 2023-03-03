const { GenericContainer, Network } = require('testcontainers');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const HTTPStatus = require('../../src/helpers/HTTP.status');
const {
  CATEGORY_MOCK_INSTANCE,
  CATEGORY_MOCK_PAYLOAD,
} = require('../mocks/categories');

describe('Testing categories CRUD', () => {
  let mongoContainer = '';
  let apiContainer = '';
  let network = '';
  jest.setTimeout(20000);

  beforeAll(async () => {
    network = await new Network({ name: 'test-categories-ecomm' }).start();

    mongoContainer = await new GenericContainer('mongo:5')
      .withName('test_mongo_ecomm_categories')
      .withExposedPorts(27017)
      .withEnvironment('MONGO_INITDB_ROOT_USERNAME', 'root')
      .withEnvironment('MONGO_INITDB_ROOT_PASSWORD', 'secret')
      .withNetworkMode(network.getName())
      .start();

    apiContainer = await new GenericContainer('ecommerce_product-container')
      .withExposedPorts(3001)
      .withEnvironment('DB_HOST', 'test_mongo_ecomm_categories')
      .withNetworkMode(network.getName())
      .start();

    await mongoose.connect('mongodb://root:secret@127.0.0.1:27017/test_mongo_ecomm_categories?authSource=admin');
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await apiContainer.stop();
    await mongoContainer.stop();
    await network.stop();
  });

  it('GET: A list of categories should be returned', async () => {
    const properties = Object.keys(CATEGORY_MOCK_INSTANCE);
    const response = await request(app)
      .get('/api/categories')
      .expect(HTTPStatus.OK);

    expect(response.body.length > 0).toBe(true);
    properties.forEach((prop) => {
      expect(response.body[0]).toHaveProperty(prop);
    });
  });

  it('POST: A category should be created', async () => {
    const response = await request(app)
      .post('/api/categories')
      .send(CATEGORY_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toEqual('active');
  });

  it('PUT: A category should be edited', async () => {
    const NEW_CATEGORY_MOCK_PAYLOAD = {
      name: 'CELULAR INTELIGENTE',
      status: 'inactive',
    };

    const responsePost = await request(app)
      .post('/api/categories')
      .send(CATEGORY_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    const responsePut = await request(app)
      .put(`/api/categories/${responsePost.body._id}`)
      .send(NEW_CATEGORY_MOCK_PAYLOAD)
      .expect(HTTPStatus.OK);

    expect(responsePut.body).toHaveProperty('_id');
    expect(responsePut.body).toHaveProperty('name');
    expect(responsePut.body.name).toBe(NEW_CATEGORY_MOCK_PAYLOAD.name);
    expect(responsePut.body).toHaveProperty('status');
    expect(responsePut.body.status).toEqual('inactive');
  });

  it('PATCH: A category should be activated or inactivaded', async () => {
    const NEW_CATEGORY_MOCK_PAYLOAD = {
      status: 'inactive',
    };

    const responsePost = await request(app)
      .post('/api/categories')
      .send(CATEGORY_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    const responsePatch = await request(app)
      .patch(`/api/categories/${responsePost.body._id}`)
      .send(NEW_CATEGORY_MOCK_PAYLOAD)
      .expect(HTTPStatus.OK);

    expect(responsePatch.body).toHaveProperty('_id');
    expect(responsePatch.body).toHaveProperty('name');
    expect(responsePatch.body).toHaveProperty('status');
    expect(responsePatch.body.status).toEqual('inactive');
  });

  it('DELETE: A category should be deleted', async () => {
    const response = await request(app)
      .post('/api/categories')
      .send(CATEGORY_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    await request(app)
      .delete(`/api/categories/${response.body._id}`)
      .expect(HTTPStatus.NO_CONTENT);
  });
});
