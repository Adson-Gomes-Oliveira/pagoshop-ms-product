const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');

const router = Router();

router.post('/', categoriesController.create);

module.exports = router;