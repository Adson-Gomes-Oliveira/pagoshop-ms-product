const ProductsServices = require('../services/products.service');
const HTTPStatus = require('../helpers/HTTP.status');

const findAll = async (_req, res) => {
  const response = await ProductsServices.findAll();
  return res.status(HTTPStatus.OK).json(response);
};

const findByOrder = async (req, res) => {
  const payload = req.body;
  const response = await ProductsServices.findByOrder(payload);

  return res.status(HTTPStatus.OK).json(response);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const response = await ProductsServices.findOne(id);

  return res.status(HTTPStatus.OK).json(response);
};

const create = async (req, res) => {
  const payload = req.body;
  const response = await ProductsServices.create(payload);

  return res.status(HTTPStatus.CREATED)
    .set('Location', `/api/products/${response._id}`)
    .json(response);
};

const edit = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const response = await ProductsServices.update(id, payload);
  return res.status(HTTPStatus.OK)
    .set('Location', `/api/products/${response._id}`)
    .json(response);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  await ProductsServices.deleteOne(id);

  return res.status(HTTPStatus.NO_CONTENT).end();
};

module.exports = {
  findAll,
  findByOrder,
  findOne,
  create,
  edit,
  deleteOne,
};
