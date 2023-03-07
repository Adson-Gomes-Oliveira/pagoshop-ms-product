const { Router } = require('express');
const productController = require('../controllers/products.controller');
const idValidation = require('../middlewares/id.middleware');

const router = Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findOne);
router.post('/order', productController.findByOrder);
router.post('/', productController.create);
router.put('/:id', idValidation, productController.edit);
router.delete('/:id', idValidation, productController.deleteOne);

module.exports = router;
