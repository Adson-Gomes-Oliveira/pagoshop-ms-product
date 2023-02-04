const ProductModel = require('../models/products.model');
const HTTPStatus = require('../../../helpers/HTTP.status');
const validations = require('../validations/products.validations');

const findAll = async (_req, res) => {
  const response = await ProductModel.find();
  return res.status(HTTPStatus.OK).json(response);
}

const findOne = async (req, res) => {
  const { id } = req.params;
  const response = await ProductModel.findById(id);

  return res.status(HTTPStatus.OK).json(response);
}

const create = async (req, res) => {
  const payload = req.body;
  const valid = validations.create(payload);
  if (valid) return res.status(valid.status).send(valid.message);

  const response = await ProductModel.create(payload);

  return res.status(HTTPStatus.CREATED).json(response);
}

module.exports = {
  findAll,
  create,
}