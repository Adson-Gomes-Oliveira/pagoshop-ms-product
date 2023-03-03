const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');
const idValidation = require('../middlewares/id.middleware');

const router = Router();

router.get('/', categoriesController.findAll);
router.get('/:id', idValidation, categoriesController.findOne);
router.post('/', categoriesController.create);
router.put('/:id', idValidation, categoriesController.edit);
router.patch('/:id', idValidation, categoriesController.editStatus);
router.delete('/:id', idValidation, categoriesController.deleteOne);

module.exports = router;
