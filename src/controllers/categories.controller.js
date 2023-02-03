const CategoriesModel = require('../models/categories.model');
const HTTPStatus = require('../../../helpers/HTTP.status');
const validations = require('../validations/categories.validations');

const findAll = async (_req, res) => {
  const response = await CategoriesModel.find();
  return res.status(HTTPStatus.OK).json(response);
}

const create = async (req, res) => {
  const payload = req.body;
  const valid = validations.create(payload);
  if (valid !== null) return res.status(valid.status).send(valid.message);

  const response = await CategoriesModel.create(payload);
  return res.status(HTTPStatus).json(response);
}

module.exports = {
  findAll,
  create,
}
