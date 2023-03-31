/* eslint-disable function-paren-newline */
const CategoriesModel = require('../models/categories.model');
const CustomError = require('../helpers/error.custom');
const HTTPStatus = require('../helpers/HTTP.status');
const validate = require('../validations/categories.validations');

const findAll = async () => {
  const categoriesList = await CategoriesModel.find();
  return categoriesList;
};

const findOne = async (id) => {
  const category = await CategoriesModel.findById(id);
  if (!category) return new CustomError('Entity not found', HTTPStatus.NOT_FOUND);

  return category;
};

const create = async (payload) => {
  validate.create(payload);
  const newPayload = { ...payload, status: 'active' };

  const newCategory = await CategoriesModel.create(newPayload);
  return newCategory;
};

const update = async (id, payload) => {
  validate.update(payload, id);

  const categoryUpdated = await CategoriesModel.findByIdAndUpdate(id, payload, { new: true });
  return categoryUpdated;
};

const updateStatus = async (id, payload) => {
  validate.updateStatus(payload, id);

  const previousCategoryDataToUpdate = await CategoriesModel.findById(id);
  previousCategoryDataToUpdate.status = payload.status;

  const categoryDataUpdated = await CategoriesModel.findByIdAndUpdate(
    id, previousCategoryDataToUpdate, { new: true },
  );

  return categoryDataUpdated;
};

const deleteOne = async (id) => {
  await CategoriesModel.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  updateStatus,
  deleteOne,
};
