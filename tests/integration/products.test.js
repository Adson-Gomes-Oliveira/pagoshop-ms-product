const axios = require('axios');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const HTTPStatus = require('../../src/helpers/HTTP.status');
const ProductsModel = require('../../src/models/products.model');
const {
  PRODUCT_MOCK_INSTANCE,
  PRODUCT_MOCK_PAYLOAD,
  PRODUCT_ORDER_MOCK_PAYLOAD,
} = require('../mocks/products.mock');

describe('Testing products CRUD', () => {
  let token = 'Bearer ';
  beforeAll(async () => {
    await mongoose.connect('mongodb://root:secret@127.0.0.1:27018/test_ecomm_products?authSource=admin');
    await ProductsModel.create(PRODUCT_MOCK_PAYLOAD);

    const response = await axios.post('http://127.0.0.1:3002/api/login', {
      email: 'adsongoliveira2022@outlook.com',
      password: '@Raven132pp87',
    });

    token += response.data.token;
  });

  afterAll(async () => {
    await ProductsModel.deleteMany();
    await mongoose.connection.close();
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
      .set('Authorization', token)
      .send(PRODUCT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('category');
    delete response.body._id;
    expect(response.body).toEqual(PRODUCT_MOCK_PAYLOAD);
  });

  it('POST: A list of products in order format should be returned', async () => {
    const properties = ['product', 'price', 'quantity'];
    const responseCreate = await request(app)
      .post('/api/products')
      .set('Authorization', token)
      .send(PRODUCT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    PRODUCT_ORDER_MOCK_PAYLOAD[0].productId = responseCreate.body._id;
    PRODUCT_ORDER_MOCK_PAYLOAD[1].productId = responseCreate.body._id;

    const response = await request(app)
      .post('/api/products/order')
      .send(PRODUCT_ORDER_MOCK_PAYLOAD);

    expect(response.body.length === 2).toBe(true);
    properties.forEach((prop) => {
      expect(response.body[0]).toHaveProperty(prop);
    });
  });

  it('PUT: A product should be edited', async () => {
    const NEW_PRODUCT_MOCK_PAYLOAD = {
      ...PRODUCT_MOCK_PAYLOAD,
      slug: 'smartphone-galaxy-s20-fe',
      unit_price: 2150,
    };

    const responsePost = await request(app)
      .post('/api/products')
      .set('Authorization', token)
      .send(PRODUCT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    const responsePut = await request(app)
      .put(`/api/products/${responsePost.body._id}`)
      .set('Authorization', token)
      .send(NEW_PRODUCT_MOCK_PAYLOAD)
      .expect(HTTPStatus.OK);

    expect(responsePut.body).toHaveProperty('_id');
    expect(responsePut.body).toHaveProperty('category');
    delete responsePut.body._id;
    expect(responsePut.body).toEqual(NEW_PRODUCT_MOCK_PAYLOAD);
  });

  it('DELETE: A product should be deleted', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', token)
      .send(PRODUCT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    await request(app)
      .delete(`/api/products/${response.body._id}`)
      .expect(HTTPStatus.NO_CONTENT);
  });
});
