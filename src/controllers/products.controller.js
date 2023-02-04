const ProductModel = require('../models/products.model');
const HTTPStatus = require('../../../helpers/HTTP.status');
const validations = require('../validations/products.validations');

const findAll = (_req, res) => {
  const response = ProductModel.find();
  return res.HTTPStatus(HTTPStatus.OK).json(response);
}

module.exports = {
  findAll,
}