const mongoose = require('mongoose');
const HTTPStatus = require('../helpers/HTTP.status');
const customError = require('../helpers/error.custom');

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (mongoose.isValidObjectId(id)) return next();
  throw customError('Invalid ID !', HTTPStatus.UN_ENTITY);
};

module.exports = validateId;
