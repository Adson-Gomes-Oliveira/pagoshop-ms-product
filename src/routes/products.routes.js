const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const router = Router();
router.get('/', productsController.findAll);
router.get('/:id', productsController.findOne);
router.post('/', productsController.create);
router.post('/order', productsController.findByOrder);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.deleteOne);

module.exports = router;
