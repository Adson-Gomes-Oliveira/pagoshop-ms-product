const JOI = require('joi');
const HTTPStatus = require('../helpers/HTTP.status');
const customError = require('../helpers/error.custom');

const create = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().min(3).pattern(new RegExp(/^[^0-9]/)).required()
  }).validate(payload);

  if (error) throw customError(error.message, HTTPStatus.UN_ENTITY);
  return null;
}

const edit = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().min(3).pattern(new RegExp(/^[^0-9]/)).required(),
    status: JOI.string().pattern(new RegExp('^(active|inactive)$')).required(),
  }).validate(payload);

  if (error) throw customError(error.message, HTTPStatus.UN_ENTITY);
  return null;
}

const editOne = (payload) => {
  const { error } = JOI.object({
    status: JOI.string().pattern(new RegExp('^(active|inactive)$')).required(),
  }).validate(payload);

  if (error) throw customError(error.message, HTTPStatus.UN_ENTITY);
  return null;
}

module.exports = {
  create,
  edit,
  editOne,
}
