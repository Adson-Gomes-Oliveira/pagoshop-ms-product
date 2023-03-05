const categoriesServices = require('../services/categories.service');
const HTTPStatus = require('../helpers/HTTP.status');

const findAll = async (_req, res) => {
  const response = await categoriesServices.findAll();
  return res.status(HTTPStatus.OK).json(response);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const response = await categoriesServices.findOne(id);

  return res.status(HTTPStatus.OK).json(response);
};

const create = async (req, res) => {
  const payload = req.body;
  const response = await categoriesServices.create(payload);

  return res.status(HTTPStatus.CREATED)
    .set('Location', `/api/categories/${response._id}`)
    .json(response);
};

const edit = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const response = await categoriesServices.update(id, payload);
  return res.status(HTTPStatus.OK)
    .set('Location', `/api/categories/${response._id}`)
    .json(response);
};

const editStatus = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const response = await categoriesServices.updateStatus(id, payload);
  return res.status(HTTPStatus.OK)
    .set('Location', `/api/categories/${response._id}`)
    .json(response);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  await categoriesServices.deleteOne(id);

  return res.status(HTTPStatus.NO_CONTENT).end();
};

module.exports = {
  findAll,
  findOne,
  create,
  edit,
  editStatus,
  deleteOne,
};
