const JOI = require('joi');
const HTTPStatus = require('../helpers/HTTP.status');
const customError = require('../helpers/error.custom');

const create = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().min(3).pattern(/^[^0-9]/).required(),
  }).validate(payload);

  if (error) throw customError(error.message, HTTPStatus.UN_ENTITY);
};

const edit = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().min(3).pattern(/^[^0-9]/).required(),
    status: JOI.string().pattern(/^(active|inactive)$/).required(),
  }).validate(payload);

  if (error) throw customError(error.message, HTTPStatus.UN_ENTITY);
};

const editStatus = (payload) => {
  const { error } = JOI.object({
    status: JOI.string().pattern(/^(active|inactive)$/).required(),
  }).validate(payload);

  if (error) throw customError(error.message, HTTPStatus.UN_ENTITY);
};

module.exports = {
  create,
  edit,
  editStatus,
};
