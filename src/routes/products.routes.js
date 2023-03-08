const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const idValidation = require('../middlewares/id.middleware');

const router = Router();

router.get('/', productsController.findAll);
router.get('/:id', productsController.findOne);
router.post('/order', productsController.findByOrder);
router.post('/', productsController.create);
router.put('/:id', idValidation, productsController.update);
router.delete('/:id', idValidation, productsController.deleteOne);

module.exports = router;
