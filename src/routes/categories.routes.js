const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');

const router = Router();

router.get('/', categoriesController.findAll);
router.get('/:id', categoriesController.findOne);
router.post('/', categoriesController.create);
router.put('/:id', categoriesController.update);
router.patch('/:id', categoriesController.updateStatus);
router.delete('/:id', categoriesController.deleteOne);

module.exports = router;
