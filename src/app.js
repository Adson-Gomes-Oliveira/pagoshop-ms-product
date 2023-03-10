require('express-async-errors');
require('./middlewares/auth.middleware');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const routes = require('./routes');
const swaggerDocument = require('../products-swagger.json');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.get('/health-check', (_req, res) => res.status(200).send('Connection OK'));
app.use('/api/categories', routes.categoriesRoutes);
app.use('/api/products', routes.productsRoutes);
app.use(errorMiddleware);

app.use('/api-docs', swaggerUI.serve);
app.get('/api-docs', swaggerUI.setup(swaggerDocument));

module.exports = app;
