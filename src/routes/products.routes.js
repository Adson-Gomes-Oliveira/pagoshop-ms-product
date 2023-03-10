const { Router } = require('express');
const passport = require('passport');
const productsController = require('../controllers/products.controller');
const idValidation = require('../middlewares/id.middleware');

const router = Router();

router.get('/', productsController.findAll);
router.get('/:id', productsController.findOne);
router.use(passport.authenticate('bearer', { session: false }));
router.post('/order', productsController.findByOrder);
router.post('/', productsController.create);
router.put('/:id', idValidation, productsController.update);
router.delete('/:id', idValidation, productsController.deleteOne);

module.exports = router;
