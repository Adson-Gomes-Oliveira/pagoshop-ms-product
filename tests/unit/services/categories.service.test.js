const CategoriesModel = require('../../../src/models/categories.model');
const CategoriesServices = require('../../../src/services/categories.service');
const {
  CATEGORY_MOCK_INSTANCE, CATEGORY_MOCK_PAYLOAD,
} = require('../../mocks/categories.mock');

describe('Testing Categories Services', () => {
  describe('GET: A list of categories', () => {
    beforeAll(() => {
      jest.spyOn(CategoriesModel, 'find').mockResolvedValueOnce([CATEGORY_MOCK_INSTANCE])
        .mockResolvedValue([]);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned with success', async () => {
      const categoriesListTest = await CategoriesServices.findAll();
      expect(categoriesListTest).toBeInstanceOf(Array);
      expect(categoriesListTest[0]).toBe(CATEGORY_MOCK_INSTANCE);
    });

    it('should fail and throw 404 error', async () => {
      try {
        await CategoriesServices.findAll();
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Content not found');
      }
    });
  });

  describe('GET: A specific category', () => {
    beforeAll(() => {
      jest.spyOn(CategoriesModel, 'findById').mockResolvedValueOnce(CATEGORY_MOCK_INSTANCE)
        .mockResolvedValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned with success', async () => {
      const categoryListTest = await CategoriesServices.findOne(CATEGORY_MOCK_INSTANCE._id);
      expect(categoryListTest).toBe(CATEGORY_MOCK_INSTANCE);
    });

    it('should fail and throw 404 error', async () => {
      try {
        await CategoriesServices.findOne(CATEGORY_MOCK_INSTANCE._id);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Content not found');
      }
    });
  });

  describe('POST: A category', () => {
    beforeAll(() => {
      jest.spyOn(CategoriesModel, 'create').mockResolvedValue(CATEGORY_MOCK_INSTANCE);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be created with success', async () => {
      const categoryTest = await CategoriesServices.create(CATEGORY_MOCK_PAYLOAD);
      expect(categoryTest).toHaveProperty('_id');
      expect(categoryTest).toBe(CATEGORY_MOCK_INSTANCE);
    });

    it('should fail when validation is failing and throw 422 error', async () => {
      try {
        const { name: _, ...CATEGORY_MOCK_PAYLOAD_WRONG } = CATEGORY_MOCK_PAYLOAD;
        await CategoriesServices.create(CATEGORY_MOCK_PAYLOAD_WRONG);
      } catch (error) {
        expect(error.status).toBe(422);
        expect(error.message).toBe('name is required');
      }
    });
  });

  describe('PUT: A category', () => {
    beforeAll(() => {
      jest.spyOn(CategoriesModel, 'findByIdAndUpdate').mockResolvedValueOnce({ ...CATEGORY_MOCK_INSTANCE, tags: ['test'] })
        .mockResolvedValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be updated with success', async () => {
      const categoryTest = await CategoriesServices.update(CATEGORY_MOCK_INSTANCE._id, {
        ...CATEGORY_MOCK_PAYLOAD,
        tags: ['test'],
        status: 'active',
      });
      expect(categoryTest).toStrictEqual({ ...CATEGORY_MOCK_INSTANCE, tags: ['test'] });
    });

    it('should fail when validation is failing and throw 422 error', async () => {
      try {
        await CategoriesServices.update(CATEGORY_MOCK_INSTANCE._id, CATEGORY_MOCK_PAYLOAD);
      } catch (error) {
        expect(error.status).toBe(422);
        // eslint-disable-next-line no-useless-escape
        expect(error.message).toBe('status is required');
      }
    });
  });

  describe('PATCH: A category', () => {
    beforeAll(() => {
      jest.spyOn(CategoriesModel, 'findById').mockResolvedValueOnce(CATEGORY_MOCK_INSTANCE);
      jest.spyOn(CategoriesModel, 'findByIdAndUpdate').mockResolvedValue({ ...CATEGORY_MOCK_INSTANCE, status: 'inactive' });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should have the status updated with success', async () => {
      const categoryTest = await CategoriesServices.updateStatus(CATEGORY_MOCK_INSTANCE._id, { status: 'inactive' });
      expect(categoryTest).toStrictEqual({ ...CATEGORY_MOCK_INSTANCE, status: 'inactive' });
    });

    it('should fail when status is not allowed and throw 422 error', async () => {
      try {
        await CategoriesServices.updateStatus(CATEGORY_MOCK_INSTANCE._id, { status: 'standBy' });
      } catch (error) {
        expect(error.status).toBe(422);
        expect(error.message).toBe('status with value standBy fails to match the required pattern: /^(active|inactive)$/');
      }
    });

    it('should fail when id does not exist and throw 400 error', async () => {
      try {
        await CategoriesServices.updateStatus(null, { status: 'inactive' });
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toBe('Id do not exist');
      }
    });
  });

  describe('DELETE: A category', () => {
    beforeAll(() => {
      jest.spyOn(CategoriesModel, 'findByIdAndDelete').mockResolvedValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be deleted with success', async () => {
      const cateogryTest = await CategoriesServices.deleteOne(CATEGORY_MOCK_INSTANCE._id);
      expect(cateogryTest).toBe(undefined);
    });
  });
});
