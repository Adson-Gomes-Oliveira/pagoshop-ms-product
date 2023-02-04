const { Router } = require('express');
const productController = require('../controllers/products.controller');

const router = Router();

router.post('/', productController.create);

module.exports = router;