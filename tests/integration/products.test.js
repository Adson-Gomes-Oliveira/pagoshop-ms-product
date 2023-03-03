const { GenericContainer, Network } = require('testcontainers');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const HTTPStatus = require('../../src/helpers/HTTP.status');
const {
  PRODUCT_MOCK_INSTANCE,
  PRODUCT_MOCK_PAYLOAD,
} = require('../mocks/products');

describe('Testing products CRUD', () => {
  let mongoContainer = '';
  let apiContainer = '';
  let network = '';
  jest.setTimeout(20000);

  beforeAll(async () => {
    network = await new Network({ name: 'test-product-ecomm' }).start();

    mongoContainer = await new GenericContainer('mongo:5')
      .withName('test_mongo_ecomm_products')
      .withExposedPorts(27017)
      .withEnvironment('MONGO_INITDB_ROOT_USERNAME', 'root')
      .withEnvironment('MONGO_INITDB_ROOT_PASSWORD', 'secret')
      .withNetworkMode(network.getName())
      .start();

    apiContainer = await new GenericContainer('ecommerce_product-container')
      .withExposedPorts(3001)
      .withEnvironment('DB_HOST', 'test_mongo_ecomm_products')
      .withNetworkMode(network.getName())
      .start();

    await mongoose.connect('mongodb://root:secret@127.0.0.1:27017/test_mongo_ecomm_products?authSource=admin');
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await apiContainer.stop();
    await mongoContainer.stop();
    await network.stop();
  });

  it('GET: A list of products should be returned', async () => {
    const properties = Object.keys(PRODUCT_MOCK_INSTANCE);
    const response = await request(app)
      .get('/api/products')
      .expect(HTTPStatus.OK);

    expect(response.body.length >= 0).toBe(true);
    properties.forEach((prop) => {
      expect(response.body[0]).toHaveProperty(prop);
    });
  });

  it('POST: A product should be created', async () => {
    const response = await request(app)
      .post('/api/products')
      .send(PRODUCT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('category_id');
    delete response.body._id;
    expect(response.body).toEqual(PRODUCT_MOCK_PAYLOAD);
  });

  it('PUT: A product should be edited', async () => {
    const NEW_PRODUCT_MOCK_PAYLOAD = {
      ...PRODUCT_MOCK_PAYLOAD,
      slug: 'smartphone-galaxy-s20-fe',
      unit_price: 2150,
    };

    const responsePost = await request(app)
      .post('/api/products')
      .send(PRODUCT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    const responsePut = await request(app)
      .put(`/api/products/${responsePost.body._id}`)
      .send(NEW_PRODUCT_MOCK_PAYLOAD)
      .expect(HTTPStatus.OK);

    expect(responsePut.body).toHaveProperty('_id');
    expect(responsePut.body).toHaveProperty('category_id');
    delete responsePut.body._id;
    expect(responsePut.body).toEqual(NEW_PRODUCT_MOCK_PAYLOAD);
  });

  it('DELETE: A product should be deleted', async () => {
    const response = await request(app)
      .post('/api/products')
      .send(PRODUCT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    await request(app)
      .delete(`/api/products/${response.body._id}`)
      .expect(HTTPStatus.NO_CONTENT);
  });
});
