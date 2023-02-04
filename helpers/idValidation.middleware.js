const mongoose = require('mongoose');
const HTTPStatus = require('./HTTP.status');

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (mongoose.isValidObjectId(id)) return next();
  return res.status(HTTPStatus.UN_ENTITY).send('Id is invalid !');
}

module.exports = validateId;