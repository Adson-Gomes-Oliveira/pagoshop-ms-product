const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');
const idValidation = require('../../../helpers/idValidation.middleware');

const router = Router();

router.get('/', categoriesController.findAll);
router.get('/:id', idValidation, categoriesController.findOne);

module.exports = router;
