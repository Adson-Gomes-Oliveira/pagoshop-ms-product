/* eslint-disable function-paren-newline */
const ProductsModel = require('../models/products.model');
const CustomError = require('../helpers/error.custom');
const HTTPStatus = require('../helpers/HTTP.status');
const validate = require('../validations/products.validations');

const formatList = async (product) => {
  const productToFind = await ProductsModel.findById(product.productId);

  return {
    product: productToFind.product,
    quantity: product.quantity,
    price: product.actualUnitPrice - product.discount,
  };
};

const findAll = async () => {
  const productsList = await ProductsModel.find();
  return productsList;
};

const findByOrder = async (payload) => {
  const productList = await Promise.all(payload.map(formatList));
  return productList;
};

const findOne = async (id) => {
  const product = await ProductsModel.findById(id);
  if (!product) return new CustomError('Entity not found', HTTPStatus.NOT_FOUND);

  return product;
};

const create = async (payload) => {
  validate.create(payload);
  const newPayload = { ...payload, status: 'active' };

  const newProduct = await ProductsModel.create(newPayload);
  return newProduct;
};

const update = async (id, payload) => {
  validate.create(payload);

  const productUpdated = await ProductsModel.findByIdAndUpdate(id, payload, { new: true });
  return productUpdated;
};

const deleteOne = async (id) => {
  await ProductsModel.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  findByOrder,
  findOne,
  create,
  update,
  deleteOne,
};
