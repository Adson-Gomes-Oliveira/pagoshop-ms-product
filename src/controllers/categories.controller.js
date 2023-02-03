const CategoriesModel = require('../models/categories.model');
const HTTPStatus = require('../../../helpers/HTTP.status');
const validations = require('../validations/categories.validations');

const findAll = async (_req, res) => {
  const response = await CategoriesModel.find();
  return res.status(HTTPStatus.OK).json(response);
}

const findOne = async (req, res) => {
  const { id } = req.params;
  const response = await CategoriesModel.findById(id);
  if (!response) return res.status(HTTPStatus.NO_CONTENT).send("Entity not found")

  return res.status(HTTPStatus.OK).json(response);
}

const create = async (req, res) => {
  const payload = req.body;
  const valid = validations.create(payload);
  if (valid !== null) return res.status(valid.status).send(valid.message);

  payload.status = "active";
  const response = await CategoriesModel.create(payload);
  console.log(response);
  return res.status(HTTPStatus.CREATED).json(response);
}

const edit = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const valid = validations.edit(payload);
  if (valid !== null) return res.status(valid.status).send(valid.message);

  const response = await CategoriesModel.findByIdAndUpdate(id, payload, { new: true });
  return res.status(HTTPStatus.CREATED).json(response);
}

const editOne = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  
  const valid = validations.editOne(payload, Object.keys(payload)[0]);
  if (valid !== null) return res.status(valid.status).send(valid.message);

  const recoverDoc = await CategoriesModel.findById(id);

  const newDoc = { ...recoverDoc._doc, ...payload };
  const response = await CategoriesModel.findByIdAndUpdate(id, newDoc, { new: true });
  return res.status(HTTPStatus.CREATED).json(response);
}

const deleteOne = async (req, res) => {
  const { id } = req.params;
  await CategoriesModel.findByIdAndDelete(id);

  return res.status(HTTPStatus.DELETED).end();
}

module.exports = {
  findAll,
  findOne,
  create,
  edit,
  editOne,
  deleteOne,
}
