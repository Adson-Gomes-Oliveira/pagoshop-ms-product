const ProductsModel = require('../../../src/models/products.model');
const ProductServices = require('../../../src/services/products.service');
const {
  PRODUCT_MOCK_INSTANCE, PRODUCT_MOCK_PAYLOAD, PRODUCT_ORDER_MOCK_PAYLOAD,
} = require('../../mocks/products.mock');

describe('Testing Products Services', () => {
  beforeAll(() => {
    const mockPopulateArray = jest.fn().mockReturnValue([PRODUCT_MOCK_INSTANCE]);
    const mockPopulateObject = jest.fn().mockReturnValue(PRODUCT_MOCK_INSTANCE);
    const mockFind = jest.fn().mockReturnValue({ populate: mockPopulateArray });
    const mockFindById = jest.fn().mockReturnValue({ populate: mockPopulateObject });

    jest.spyOn(ProductsModel, 'find').mockImplementationOnce(mockFind);
    jest.spyOn(ProductsModel, 'findById').mockImplementation(mockFindById);
    jest.spyOn(ProductsModel, 'create').mockResolvedValue(PRODUCT_MOCK_INSTANCE);
    jest.spyOn(ProductsModel, 'findByIdAndUpdate').mockResolvedValue({ ...PRODUCT_MOCK_INSTANCE, product: 'Iphone 13' });
    jest.spyOn(ProductsModel, 'findByIdAndDelete').mockResolvedValue();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('GET: A list of products should be returned', async () => {
    const resultProperties = Object.keys(PRODUCT_MOCK_INSTANCE);
    const productListTest = await ProductServices.findAll();
    expect(productListTest).toBeInstanceOf(Array);
    resultProperties.forEach((prop) => {
      expect(productListTest[0]).toHaveProperty(prop);
    });
  });

  it('GET: A specific product should be returned', async () => {
    const productListTest = await ProductServices.findOne(PRODUCT_MOCK_INSTANCE._id);
    expect(productListTest).toBe(PRODUCT_MOCK_INSTANCE);
  });

  it('POST: A list of product in order format should be returned with success', async () => {
    const RESULT_MOCK = {
      product: undefined,
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
