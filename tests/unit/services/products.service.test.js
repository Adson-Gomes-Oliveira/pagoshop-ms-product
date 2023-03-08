const ProductsModel = require('../../../src/models/products.model');
const ProductServices = require('../../../src/services/products.service');
const {
  PRODUCT_MOCK_INSTANCE, PRODUCT_MOCK_PAYLOAD, PRODUCT_ORDER_MOCK_PAYLOAD,
} = require('../../mocks/products.mock');

describe('Testing Products Services', () => {
  beforeAll(() => {
    jest.spyOn(ProductsModel, 'find').mockResolvedValue([PRODUCT_MOCK_INSTANCE]);
    jest.spyOn(ProductsModel, 'findById').mockResolvedValue(PRODUCT_MOCK_INSTANCE);
    jest.spyOn(ProductsModel, 'create').mockResolvedValue(PRODUCT_MOCK_INSTANCE);
    jest.spyOn(ProductsModel, 'findByIdAndUpdate').mockResolvedValue({ ...PRODUCT_MOCK_INSTANCE, product: 'Iphone 13' });
    jest.spyOn(ProductsModel, 'findByIdAndDelete').mockResolvedValue();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('GET: A list of products should be returned', async () => {
    const productListTest = await ProductServices.findAll();
    expect(productListTest).toBeInstanceOf(Array);
    expect(productListTest[0]).toBe(PRODUCT_MOCK_INSTANCE);
  });

  it('GET: A specific product should be returned based on id', async () => {
    const productTest = await ProductServices.findOne(PRODUCT_MOCK_INSTANCE._id);
    expect(productTest).toHaveProperty('_id');
    expect(productTest._id).toBe(PRODUCT_MOCK_INSTANCE._id);
  });

  it('POST: A list of product in order format should be returned with success', async () => {
    const RESULT_MOCK = {
      product: 'SAMSUNG GALAXY S20FE',
      quantity: PRODUCT_ORDER_MOCK_PAYLOAD[0].quantity,
      price: PRODUCT_ORDER_MOCK_PAYLOAD[0].actualUnitPrice - PRODUCT_ORDER_MOCK_PAYLOAD[0].discount,
    };
    const productTest = await ProductServices.findByOrder(PRODUCT_ORDER_MOCK_PAYLOAD);
    expect(productTest[0]).toStrictEqual(RESULT_MOCK);
    expect(productTest[1]).toStrictEqual(RESULT_MOCK);
  });

  it('POST: A product should be added with success', async () => {
    const productTest = await ProductServices.create(PRODUCT_MOCK_PAYLOAD);
    expect(productTest).toHaveProperty('_id');
    expect(productTest).toBe(PRODUCT_MOCK_INSTANCE);
  });

  it('PUT: A product should be updated with success', async () => {
    const productTest = await ProductServices.update({ ...PRODUCT_MOCK_PAYLOAD, product: 'Iphone 13' });
    expect(productTest).toStrictEqual({ ...PRODUCT_MOCK_INSTANCE, product: 'Iphone 13' });
  });

  it('DELETE: A product should be deleted with success', async () => {
    const productTest = await ProductServices.deleteOne(PRODUCT_MOCK_INSTANCE._id);
    expect(productTest).toBe(undefined);
  });
});
