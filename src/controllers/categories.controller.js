const CategoriesModel = require('../models/categories.model');
const HTTPStatus = require('../../../helpers/HTTP.status')

const findAll = async (_req, res) => {
  const response = await CategoriesModel.find();
  res.status(HTTPStatus.OK).json(response);
}

const create = async (req, res) => {
  const payload = req.body;
}

module.exports = {
  findAll,
}
