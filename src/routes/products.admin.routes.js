const { Router } = require('express');
const productController = require('../controllers/products.controller');
const idValidation = require('../../helpers/idValidation.middleware');

const router = Router();

router.post('/', productController.create);
router.put('/:id', idValidation, productController.edit);
router.delete('/:id', idValidation, productController.deleteOne);

module.exports = router;