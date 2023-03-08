const ProductsServices = require('../../../src/services/products.service');
const ProductsControllers = require('../../../src/controllers/products.controller');
const HTTPStatus = require('../../../src/helpers/HTTP.status');
const {
  PRODUCT_MOCK_INSTANCE, PRODUCT_MOCK_PAYLOAD, PRODUCT_ORDER_MOCK_PAYLOAD,
} = require('../../mocks/products.mock');

describe('Testing Products Controllers', () => {
  const request = {};
  const response = {};
  const RESULT_MOCK = {
    product: 'SAMSUNG GALAXY S20FE',
    quantity: PRODUCT_ORDER_MOCK_PAYLOAD[0].quantity,
    price: PRODUCT_ORDER_MOCK_PAYLOAD[0].actualUnitPrice - PRODUCT_ORDER_MOCK_PAYLOAD[0].discount,
  };

  beforeAll(() => {
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue();
    response.set = jest.fn().mockReturnValue(response);
    response.end = jest.fn().mockReturnValue();

    jest.spyOn(ProductsServices, 'findAll').mockResolvedValue([PRODUCT_MOCK_INSTANCE]);
    jest.spyOn(ProductsServices, 'findByOrder').mockResolvedValue([RESULT_MOCK, RESULT_MOCK]);
    jest.spyOn(ProductsServices, 'findOne').mockResolvedValue(PRODUCT_MOCK_INSTANCE);
    jest.spyOn(ProductsServices, 'create').mockResolvedValue(PRODUCT_MOCK_INSTANCE);
    jest.spyOn(ProductsServices, 'update').mockResolvedValue({ ...PRODUCT_MOCK_INSTANCE, product: 'Iphone 13' });
    jest.spyOn(ProductsServices, 'deleteOne').mockResolvedValue();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('GET: When a list of products is requested the status code 200 must be returned', async () => {
    await ProductsControllers.findAll(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
  });

  it('GET: When a product is requested the status code 200 must be returned', async () => {
    request.params = PRODUCT_MOCK_INSTANCE._id;
    await ProductsControllers.findOne(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
  });

  it('POST: When a list of product orders is given the status code 200 must be returned with the correct data', async () => {
    request.body = [PRODUCT_ORDER_MOCK_PAYLOAD, PRODUCT_MOCK_PAYLOAD];
    await ProductsControllers.findByOrder(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
    expect(response.json).toHaveBeenCalledWith([RESULT_MOCK, RESULT_MOCK]);
  });

  it('POST: When a product is created the status code 201 must be returned with the correct data', async () => {
    request.body = PRODUCT_MOCK_PAYLOAD;
    await ProductsControllers.create(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.CREATED);
    expect(response.json).toHaveBeenCalledWith(PRODUCT_MOCK_INSTANCE);
  });

  it('PUT: When a product is updated the status code 200 must be returned with the correct data', async () => {
    request.params = PRODUCT_MOCK_INSTANCE._id;
    request.body = { ...PRODUCT_MOCK_INSTANCE, product: 'Iphone 13' };
    await ProductsControllers.update(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
    expect(response.json).toHaveBeenCalledWith({ ...PRODUCT_MOCK_INSTANCE, product: 'Iphone 13' });
  });

  it('DELETE: When a product is deleted the status code 203 must be returned', async () => {
    request.params = PRODUCT_MOCK_INSTANCE._id;
    await ProductsControllers.deleteOne(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.NO_CONTENT);
  });
});
