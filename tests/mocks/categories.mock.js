const MONGO_ID_MOCK = '537eed02ed345b2e039652d2';

const CATEGORY_MOCK_INSTANCE = {
  _id: '537eed02ed345b2e039652d2',
  name: 'SMARTPHONE',
  subCategories: [],
  tags: [],
  thumbnail: 'http://imgbb.url',
  status: 'active',
};

const CATEGORY_MOCK_PAYLOAD = {
  name: 'SMARTPHONE',
  subCategories: [],
  tags: [],
  thumbnail: 'http://imgbb.url',
};

module.exports = {
  CATEGORY_MOCK_INSTANCE,
  CATEGORY_MOCK_PAYLOAD,
  MONGO_ID_MOCK,
};
