const { Router } = require('express');
const passport = require('passport');
const categoriesController = require('../controllers/categories.controller');
const idValidation = require('../middlewares/id.middleware');

const router = Router();

router.get('/', categoriesController.findAll);
router.get('/:id', idValidation, categoriesController.findOne);
router.use(passport.authenticate('bearer', { session: false }));
router.post('/', categoriesController.create);
router.put('/:id', idValidation, categoriesController.update);
router.patch('/:id', idValidation, categoriesController.updateStatus);
router.delete('/:id', idValidation, categoriesController.deleteOne);

module.exports = router;
