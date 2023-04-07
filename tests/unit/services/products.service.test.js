const ProductsModel = require('../../../src/models/products.model');
const ProductsServices = require('../../../src/services/products.service');
const {
  PRODUCT_MOCK_INSTANCE, PRODUCT_MOCK_PAYLOAD, PRODUCT_ORDER_MOCK_PAYLOAD,
} = require('../../mocks/products.mock');

describe('Testing Products Services', () => {
  describe('GET: A list of products', () => {
    beforeAll(() => {
      jest.spyOn(ProductsModel, 'find').mockResolvedValueOnce([PRODUCT_MOCK_INSTANCE])
        .mockResolvedValue([]);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned with success', async () => {
      const resultProperties = Object.keys(PRODUCT_MOCK_INSTANCE);
      const productListTest = await ProductsServices.findAll();
      expect(productListTest).toBeInstanceOf(Array);
      resultProperties.forEach((prop) => {
        expect(productListTest[0]).toHaveProperty(prop);
      });
    });

    it('should fail and throws 404 error', async () => {
      try {
        await ProductsServices.findAll();
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Content not found');
      }
    });
  });

  describe('GET: A specific product', () => {
    beforeAll(() => {
      jest.spyOn(ProductsModel, 'findById').mockResolvedValueOnce(PRODUCT_MOCK_INSTANCE)
        .mockResolvedValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned with success', async () => {
      const productListTest = await ProductsServices.findOne(PRODUCT_MOCK_INSTANCE._id);
      expect(productListTest).toBe(PRODUCT_MOCK_INSTANCE);
    });

    it('should fail and throws 404 error', async () => {
      try {
        await ProductsServices.findOne(PRODUCT_MOCK_INSTANCE._id);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Content not found');
      }
    });
  });

  describe('POST: A list of product in order format', () => {
    const RESULT_MOCK = {
      product: 'SAMSUNG GALAXY S20FE',
      quantity: PRODUCT_ORDER_MOCK_PAYLOAD[0].quantity,
      price: PRODUCT_ORDER_MOCK_PAYLOAD[0]
        .actualUnitPrice - PRODUCT_ORDER_MOCK_PAYLOAD[0]
        .discount,
    };

    beforeAll(() => {
      jest.spyOn(ProductsModel, 'findById').mockResolvedValueOnce(RESULT_MOCK)
        .mockResolvedValueOnce(RESULT_MOCK)
        .mockResolvedValueOnce()
        .mockResolvedValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned with success', async () => {
      const productTest = await ProductsServices.findByOrder(PRODUCT_ORDER_MOCK_PAYLOAD);
      expect(productTest[0]).toStrictEqual(RESULT_MOCK);
      expect(productTest[1]).toStrictEqual(RESULT_MOCK);
    });

    it('should fail and throws 404 error', async () => {
      try {
        await ProductsServices.findByOrder(PRODUCT_ORDER_MOCK_PAYLOAD);
      } catch (error) {
        expect(error.status).toBe(404);
        expect(error.message).toBe('Content not found');
      }
    });
  });

  describe('POST: A product', () => {
    beforeAll(() => {
      jest.spyOn(ProductsModel, 'create').mockResolvedValue(PRODUCT_MOCK_INSTANCE);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be created with success', async () => {
      const productTest = await ProductsServices.create(PRODUCT_MOCK_PAYLOAD);
      expect(productTest).toHaveProperty('_id');
      expect(productTest).toBe(PRODUCT_MOCK_INSTANCE);
    });

    it('should fail when validation is failing and throws 422 error', async () => {
      try {
        const { product: _, ...PRODUCT_MOCK_PAYLOAD_WRONG } = PRODUCT_MOCK_PAYLOAD;
        await ProductsServices.create(PRODUCT_MOCK_PAYLOAD_WRONG);
      } catch (error) {
        expect(error.status).toBe(422);
        expect(error.message).toBe('product is required');
      }
    });
  });

  describe('PUT: A product', () => {
    beforeAll(() => {
      jest.spyOn(ProductsModel, 'findByIdAndUpdate').mockResolvedValueOnce({ ...PRODUCT_MOCK_INSTANCE, product: 'Iphone 13' })
        .mockResolvedValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be updated with success', async () => {
      const productTest = await ProductsServices.update(PRODUCT_MOCK_INSTANCE._id, { ...PRODUCT_MOCK_PAYLOAD, product: 'Iphone 13' });
      expect(productTest).toStrictEqual({ ...PRODUCT_MOCK_INSTANCE, product: 'Iphone 13' });
    });

    it('should fail when validation is failing and throws 422 error', async () => {
      try {
        const { unitPrice: _, ...PRODUCT_MOCK_PAYLOAD_WRONG } = PRODUCT_MOCK_PAYLOAD;
        await ProductsServices.update(PRODUCT_MOCK_INSTANCE._id, { ...PRODUCT_MOCK_PAYLOAD_WRONG, product: 'Iphone 13' });
      } catch (error) {
        expect(error.status).toBe(422);
        // eslint-disable-next-line no-useless-escape
        expect(error.message).toBe('unitPrice is required');
      }
    });

    it('should fail when id does not exist', async () => {
      try {
        const { unitPrice: _, ...PRODUCT_MOCK_PAYLOAD_WRONG } = PRODUCT_MOCK_PAYLOAD;
        await ProductsServices.update({ ...PRODUCT_MOCK_PAYLOAD_WRONG, product: 'Iphone 13' });
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toBe('Id do not exist');
      }
    });
  });

  describe('DELETE: A product', () => {
    beforeAll(() => {
      jest.spyOn(ProductsModel, 'findByIdAndDelete').mockResolvedValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be deleted with success', async () => {
      const productTest = await ProductsServices.deleteOne(PRODUCT_MOCK_INSTANCE._id);
      expect(productTest).toBe(undefined);
    });
  });
});
