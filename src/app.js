require('express-async-errors');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const routes = require('./routes');
const swaggerDocument = require('../swagger/products-swagger.json');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

const USER = process.env.DB_USER || 'root';
const PASSWORD = process.env.DB_PASSWORD || 'secret';
const HOST = process.env.DB_HOST || '127.0.0.1';
const DATABASE = process.env.DB_NAME || 'ecomm-product';

mongoose.connect(`mongodb://${USER}:${PASSWORD}@${HOST}:27017/${DATABASE}?authSource=admin`)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error(error));

app.use(express.json());
app.use(cors());
app.use(helmet());
app.get('/health-check', (_req, res) => res.status(200).send('Connection OK'));
app.use('/api/categories', routes.categoriesRoutes);
app.use('/api/admin/categories', routes.categoriesAdminRoutes);
app.use('/api/products', routes.productsRoutes);
app.use('/api/admin/products', routes.productsAdminRoutes);
app.use(errorMiddleware);

app.use('/api-docs', swaggerUI.serve);
app.get('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = app;
