const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');

const router = Router();

router.post('/', categoriesController.create);
router.put('/:id', idValidation, categoriesController.edit);
router.patch('/:id', idValidation, categoriesController.editStatus);
router.delete('/:id', idValidation, categoriesController.deleteOne);

module.exports = router;