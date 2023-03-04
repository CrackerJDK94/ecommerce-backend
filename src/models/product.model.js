const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  unit: {
    type: String,
    required: true,
    trim: true,
  },
  imageLink: {
    type: String,
    required: true,
    trim: true,
  },
  promotionalPricing: {
    type: Number,
  },
  originalPrice: {
    type: Number,
  },
  quantityInStock: {
    type: Number,
  },
  tags: [
    {
      type: String,
    },
  ],
  si: {
    type: String,
  },
  vendor: {
    type: String,
  },
  descriptions: {
    type: String,
  },
});

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
