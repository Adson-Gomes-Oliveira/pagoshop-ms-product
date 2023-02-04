const JOI = require('joi');
const HTTPStatus = require('../../../helpers/HTTP.status');
const mongoose = require('mongoose');


const create = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().min(3).pattern(new RegExp(/^[^0-9]/)).required()
  }).validate(payload);

  if (error) return { status: HTTPStatus.UN_ENTITY, message: error.message };
  return null;
}

const edit = (payload, id) => {
  if (!mongoose.isValidObjectId(id)) return { status: HTTPStatus.UN_ENTITY, message: 'Invalid id !' };

  const { error } = JOI.object({
    name: JOI.string().min(3).pattern(new RegExp(/^[^0-9]/)).required(),
    status: JOI.string().pattern(new RegExp('^(avtive|inactive)$')).required(),
  }).validate(payload);

  if (error) return { status: HTTPStatus.UN_ENTITY, message: error.message };
  return null;
}

const editOne = (payload) => {
  if (!mongoose.isValidObjectId(id)) return { status: HTTPStatus.UN_ENTITY, message: 'Invalid id !' };

  const { error } = JOI.object({
    status: JOI.string().pattern(new RegExp('^(avtive|inactive)$')).required(),
  }).validate(payload);

  if (error) return { status: HTTPStatus.UN_ENTITY, message: error.message };
  return null;
}

module.exports = {
  create,
  edit,
  editOne,
}
