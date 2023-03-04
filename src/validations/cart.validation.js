const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCart = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    products: Joi.array().length(0).required(),
  }),
};

const getCarts = {
  query: Joi.object().keys({
    userId: Joi.string(),
    products: Joi.array(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCart = {
  params: Joi.object().keys({
    cartId: Joi.string().custom(objectId),
  }),
};

const getCartByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateCart = {
  params: Joi.object().keys({
    cartId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    product: { productId: Joi.string().required().custom(objectId), quantity: Joi.number().min(1).integer() },
    options: Joi.string().required(),
  }),
};

const deleteCart = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = { createCart, getCarts, getCart, getCartByUserId, updateCart, deleteCart };
