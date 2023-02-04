require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.get('/health-test', (_req, res) => res.status(200).send('Connection OK'));
app.use('/api/categories', routes.categoriesRoutes);
app.use('/api/admin/categories', routes.categoriesAdminRoutes);
app.use('/api/products', routes.productsRoutes);
app.use('/api/admin/products', routes.productsAdminRoutes);
// app.use('/api/admin/categories');

module.exports = app;
