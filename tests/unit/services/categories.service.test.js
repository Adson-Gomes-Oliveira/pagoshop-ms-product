const CategoriesModel = require('../../../src/models/categories.model');
const CategoriesServices = require('../../../src/services/categories.service');
const {
  CATEGORY_MOCK_INSTANCE, CATEGORY_MOCK_PAYLOAD,
} = require('../../mocks/categories.mock');

describe('Testing Products Services', () => {
  beforeAll(() => {
    jest.spyOn(CategoriesModel, 'find').mockResolvedValue([CATEGORY_MOCK_INSTANCE]);
    jest.spyOn(CategoriesModel, 'findById').mockResolvedValue(CATEGORY_MOCK_INSTANCE);
    jest.spyOn(CategoriesModel, 'create').mockResolvedValue(CATEGORY_MOCK_INSTANCE);
    jest.spyOn(CategoriesModel, 'findByIdAndUpdate')
      .mockResolvedValueOnce({ ...CATEGORY_MOCK_INSTANCE, name: 'ELETRO' })
      .mockResolvedValue({ ...CATEGORY_MOCK_INSTANCE, status: 'inactive' });
    jest.spyOn(CategoriesModel, 'findByIdAndDelete').mockResolvedValue();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('GET: A list of categories should be returned', async () => {
    const categoriesListTest = await CategoriesServices.findAll();
    expect(categoriesListTest).toBeInstanceOf(Array);
    expect(categoriesListTest[0]).toBe(CATEGORY_MOCK_INSTANCE);
  });

  it('GET: A specific category should be returned based on id', async () => {
    const categoryTest = await CategoriesServices.findOne(CATEGORY_MOCK_INSTANCE._id);
    expect(categoryTest).toHaveProperty('_id');
    expect(categoryTest._id).toBe(CATEGORY_MOCK_INSTANCE._id);
  });

  it('POST: A category should be added with success', async () => {
    const categoryTest = await CategoriesServices.create(CATEGORY_MOCK_PAYLOAD);
    expect(categoryTest).toHaveProperty('_id');
    expect(categoryTest).toBe(CATEGORY_MOCK_INSTANCE);
  });

  it('PUT: A category should be updated with success', async () => {
    const categoryTest = await CategoriesServices.update({ ...CATEGORY_MOCK_PAYLOAD, name: 'ELETRO' });
    expect(categoryTest).toStrictEqual({ ...CATEGORY_MOCK_INSTANCE, name: 'ELETRO' });
  });

  it('PATCH: A category should have the status updated', async () => {
    const categoryTest = await CategoriesServices.updateStatus(CATEGORY_MOCK_INSTANCE._id, { status: 'inactive' });
    expect(categoryTest).toStrictEqual({ ...CATEGORY_MOCK_INSTANCE, status: 'inactive' });
  });

  it('DELETE: A category should be deleted with success', async () => {
    const categoryTest = await CategoriesServices.deleteOne(CATEGORY_MOCK_INSTANCE._id);
    expect(categoryTest).toBe(undefined);
  });
});
