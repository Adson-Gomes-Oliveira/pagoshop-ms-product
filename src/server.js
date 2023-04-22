/* eslint-disable no-console */
const mongoose = require('mongoose');
const app = require('./app');
const createProductListByOrder = require('./services/createProductListByOrder.consumer.service');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const USER = process.env.DB_USER || 'root';
const PASSWORD = process.env.DB_PASSWORD || 'secret';
const HOST = process.env.DB_HOST || 'mongodb-ms-product:27017';
const DATABASE = process.env.DB_DATABASE || 'ms-product?authSource=admin';
const MONGO_INITIAL = process.env.MONGO_INITIAL || 'mongodb';

mongoose.connect(`${MONGO_INITIAL}://${USER}:${PASSWORD}@${HOST}/${DATABASE}`)
  .then(() => {})
  .catch((error) => console.error(error));

app.listen(PORT, () => {
  createProductListByOrder('orderProcessProduct', 'orderConfirmationToProcess');
  console.log(`Server is listening on port: ${PORT}`);
});
