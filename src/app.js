require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.get('/health-test', (_req, res) => res.status(200).send('Connection OK'));
// app.use('/api/categories');
// app.use('/api/admin/categories');

module.exports = app;
