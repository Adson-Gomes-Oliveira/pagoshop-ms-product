const categoriesServices = require('../../../src/services/categories.service');
const CategoriesControllers = require('../../../src/controllers/categories.controller');
const HTTPStatus = require('../../../src/helpers/HTTP.status');
const {
  CATEGORY_MOCK_INSTANCE, CATEGORY_MOCK_PAYLOAD,
} = require('../../mocks/categories');

describe('Testing Categories Controllers', () => {
  const request = {};
  const response = {};

  beforeAll(() => {
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue();
    response.set = jest.fn().mockReturnValue(response);
    response.end = jest.fn().mockReturnValue();

    jest.spyOn(categoriesServices, 'findAll').mockResolvedValue([CATEGORY_MOCK_INSTANCE]);
    jest.spyOn(categoriesServices, 'findOne').mockResolvedValue(CATEGORY_MOCK_INSTANCE);
    jest.spyOn(categoriesServices, 'create').mockResolvedValue(CATEGORY_MOCK_INSTANCE);
    jest.spyOn(categoriesServices, 'update').mockResolvedValue({ ...CATEGORY_MOCK_INSTANCE, name: 'ELETRO' });
    jest.spyOn(categoriesServices, 'updateStatus').mockResolvedValue({ status: 'inactive' });
    jest.spyOn(categoriesServices, 'deleteOne').mockResolvedValue();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('GET: When a list of categories is requested the status code 200 must be returned', async () => {
    await CategoriesControllers.findAll(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
  });

  it('GET: When a category is requested the status code 200 must be returned', async () => {
    request.params = CATEGORY_MOCK_INSTANCE._id;
    await CategoriesControllers.findOne(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
  });

  it('POST: When a category is created the status code 201 must be returned with the correct data', async () => {
    request.body = CATEGORY_MOCK_PAYLOAD;
    await CategoriesControllers.create(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.CREATED);
    expect(response.json).toHaveBeenCalledWith(CATEGORY_MOCK_INSTANCE);
  });

  it('PUT: When a category is updated the status code 200 must be returned with the correct data', async () => {
    request.params = CATEGORY_MOCK_INSTANCE._id;
    request.body = { ...CATEGORY_MOCK_INSTANCE, name: 'ELETRO' };
    await CategoriesControllers.edit(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
    expect(response.json).toHaveBeenCalledWith({ ...CATEGORY_MOCK_INSTANCE, name: 'ELETRO' });
  });

  it('PATCH: When a category status is updated the status code 200 must be returned with the correct status data', async () => {
    request.params = CATEGORY_MOCK_INSTANCE._id;
    request.body = { status: 'inactive' };
    await CategoriesControllers.editStatus(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
    expect(response.json).toHaveBeenCalledWith({ status: 'inactive' });
  });

  it('DELETE: When a category is deleted the status code 203 must be returned', async () => {
    request.params = CATEGORY_MOCK_INSTANCE._id;
    await CategoriesControllers.deleteOne(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.NO_CONTENT);
  });
});
