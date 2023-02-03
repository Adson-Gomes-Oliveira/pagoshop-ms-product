const JOI = require('joi');
const HTTPStatus = require('../../../helpers/HTTP.status');

const create = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().min(3).required(),
    status: JOI.string().required(),
  }).validate(payload);

  if (error) return { status: HTTPStatus.BAD_REQUEST, message: 'Bad format of requisition' };
  return null;
}

module.exports = {
  create
}
