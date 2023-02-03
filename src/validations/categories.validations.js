const JOI = require('joi');
const HTTPStatus = require('../../../helpers/HTTP.status');

const create = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().min(3).pattern(new RegExp(/^[^0-9]/)).required()
  }).validate(payload);

  if (error) return { status: HTTPStatus.BAD_REQUEST, message: 'Bad format of requisition' };
  return null;
}

const edit = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().min(3).pattern(new RegExp(/^[^0-9]/)).required(),
    status: JOI.string().pattern(new RegExp('^(avtive|inactive)$')).required(),
  }).validate(payload);

  if (error) return { status: HTTPStatus.BAD_REQUEST, message: 'Bad format of requisition' };
  return null;
}

const editOne = (payload) => {
  const { error } = JOI.object({
    status: JOI.string().pattern(new RegExp('^(avtive|inactive)$')).required(),
  }).validate(payload);

  if (error) return { status: HTTPStatus.BAD_REQUEST, message: 'Bad format of requisition' };
  return null;
}

module.exports = {
  create,
  edit,
  editOne,
}
