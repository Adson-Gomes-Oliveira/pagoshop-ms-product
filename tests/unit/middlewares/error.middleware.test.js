const errorMiddleware = require('../../../src/middlewares/error.middleware');
const HTTPStatus = require('../../../src/helpers/HTTP.status');

describe('Testing Error Middleware', () => {
  const request = {};
  const response = {};
  const error = {};
  const next = jest.fn().mockReturnValue();

  beforeAll(() => {
    response.status = jest.fn().mockReturnValue(response);
    response.send = jest.fn().mockReturnValue();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('A request with external error', () => {
    it('should return a response with the correct status code', () => {
      error.message = 'product is not allowed';
      error.status = HTTPStatus.UN_ENTITY;
      errorMiddleware(error, request, response, next);

      expect(response.status).toHaveBeenCalledWith(error.status);
    });

    it('should return a response with the correct message', () => {
      error.message = 'product is not allowed';
      error.status = HTTPStatus.UN_ENTITY;
      errorMiddleware(error, request, response, next);

      expect(response.send).toHaveBeenCalledWith(error.message);
    });
  });

  describe('A request with internal error', () => {
    it('should return a response with the correct status code', () => {
      error.message = 'internal error';
      error.status = undefined;
      errorMiddleware(error, request, response, next);

      expect(response.status).toHaveBeenCalledWith(HTTPStatus.INTERNAL);
    });

    it('should return a response with the correct error', () => {
      error.message = 'internal error';
      error.status = undefined;
      errorMiddleware(error, request, response, next);

      expect(response.send).toHaveBeenCalledWith(error);
    });
  });
});
