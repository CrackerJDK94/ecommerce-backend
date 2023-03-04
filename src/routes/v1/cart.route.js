const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cartValidation = require('../../validations/cart.validation');
const cartController = require('../../controllers/cart.controller');

const router = express.Router();

router.route('/').post(auth(), validate(cartValidation.createCart), cartController.createCart);
router
  .route('/:cartId')
  .patch(auth(), validate(cartValidation.updateCart), cartController.updateCart)
  .get(auth(), validate(cartValidation.getCart), cartController.getCartById);
router.route('/user/:userId').get(auth(), validate(cartValidation.getCartByUserId), cartController.getCartByUserId);
module.exports = router;
