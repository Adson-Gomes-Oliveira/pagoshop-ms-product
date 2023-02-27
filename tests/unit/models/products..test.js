/* eslint-disable no-undef */
const ProductsModel = require('../../../src/models/products.model');
const {
  PRODUCT_MOCK_PAYLOAD,
  PRODUCT_MOCK_INSTANCE,
  MONGO_ID_MOCK,
} = require('../../mocks/products');

describe('Testing Products Model', () => {
  it('01 - A list of all products should be returned', async () => {
    const response = await ProductsModel();
    response.find = jest.fn().mockReturnValue([PRODUCT_MOCK_INSTANCE]);
    const productsList = await response.find();

    expect(productsList).toEqual(
      expect.objectContaining([PRODUCT_MOCK_INSTANCE]),
    );
  });
  it('02 - A new product should be created with success', async () => {
    const response = await ProductsModel();
    response.create = jest.fn().mockReturnValue(PRODUCT_MOCK_INSTANCE);
    const newProduct = await response.create(PRODUCT_MOCK_PAYLOAD);

    expect(newProduct).toEqual(
      expect.objectContaining(PRODUCT_MOCK_INSTANCE),
    );
  });
  it('03 - Should be possible edit a product', async () => {
    const response = await ProductsModel();
    response.findByIdAndUpdate = jest.fn().mockReturnValue(PRODUCT_MOCK_INSTANCE);
    const productEdited = await response.findByIdAndUpdate();

    expect(productEdited).toEqual(
      expect.objectContaining(PRODUCT_MOCK_INSTANCE),
    );
  });
  it('04 - A new product should be created with success', async () => {
    const response = await ProductsModel();
    response.delete = jest.fn().mockReturnValue();
    const newProduct = await response.delete(MONGO_ID_MOCK);

    expect(newProduct).toEqual();
  });
});
