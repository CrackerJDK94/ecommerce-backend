const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    unit: Joi.string(),
    imageLink: Joi.string(),
    promotionalPricing: Joi.number().required(),
    originalPrice: Joi.number().required(),
    quantityInStock: Joi.number().integer(),
    tags: Joi.string().required(),
    si: Joi.string(),
    vendor: Joi.string().required(),
    descriptions: Joi.string(),
    capacity: Joi.number().integer(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        name: Joi.string(),
        unit: Joi.string(),
        imageLink: Joi.string(),
        promotionalPricing: Joi.number(),
        originalPrice: Joi.number(),
        quantityInStock: Joi.number().integer(),
        tags: Joi.string().required(),
        si: Joi.string(),
        vendor: Joi.string().required(),
        descriptions: Joi.string(),
        capacity: Joi.number().integer(),
    })
    .min(1),
};

const deleteProduct = {
    params: Joi.object().keys({
      productId: Joi.string().custom(objectId),
    }),
  };

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}
  
