/* eslint-disable no-undef */
const CategoriesModel = require('../../../src/models/categories.model');
const {
  CATEGORY_MOCK_PAYLOAD,
  CATEGORY_MOCK_INSTANCE,
  MONGO_ID_MOCK,
} = require('../../mocks/categories');

describe('Testing Products Model', () => {
  it('01 - A list of all products should be returned', async () => {
    const response = await CategoriesModel();
    response.find = jest.fn().mockReturnValue([CATEGORY_MOCK_INSTANCE]);
    const productsList = await response.find();

    expect(productsList).toEqual(
      expect.objectContaining([CATEGORY_MOCK_INSTANCE]),
    );
  });
  it('02 - A new product should be created with success', async () => {
    const response = await CategoriesModel();
    response.create = jest.fn().mockReturnValue(CATEGORY_MOCK_INSTANCE);
    const newProduct = await response.create(CATEGORY_MOCK_PAYLOAD);

    expect(newProduct).toEqual(
      expect.objectContaining(CATEGORY_MOCK_INSTANCE),
    );
  });
  it('03 - Should be possible edit a product', async () => {
    const response = await CategoriesModel();
    response.findByIdAndUpdate = jest.fn().mockReturnValue(CATEGORY_MOCK_INSTANCE);
    const productEdited = await response.findByIdAndUpdate();

    expect(productEdited).toEqual(
      expect.objectContaining(CATEGORY_MOCK_INSTANCE),
    );
  });
  it('04 - A new product should be created with success', async () => {
    const response = await CategoriesModel();
    response.delete = jest.fn().mockReturnValue();
    const newProduct = await response.delete(MONGO_ID_MOCK);

    expect(newProduct).toEqual();
  });
});
