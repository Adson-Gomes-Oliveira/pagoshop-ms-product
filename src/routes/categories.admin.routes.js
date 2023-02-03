const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');

const router = Router();

router.post('/', categoriesController.create);
router.put('/:id', categoriesController.edit);

module.exports = router;