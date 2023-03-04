const httpStatus = require('http-status');
const { Cart } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} cartBody
 * @returns {Promise<Cart>}
 */
const createCart = async (cartBody) => {
  return Cart.create(cartBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCarts = async (filter, options) => {
  const carts = await Cart.paginate(filter, options);
  return carts;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getCartById = async (id) => {
  return Cart.findById(id);
};

const getCartByUserId = async (id) => {
  return Cart.find({ userId: id });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<Product>}
 */

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateCartById = async (cartId, product) => {
  const cart = await getCartById(cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  const newCart = cart;
  let isCurrentInCart = false;
  for (let i = 0; i < newCart.products.length; i++) {
    if (String(newCart.products[i].productId) === String(product.productId)) {
      newCart.products[i].quantity += product.quantity;
      isCurrentInCart = true;
    }
  }

  if (!isCurrentInCart) {
    newCart.products.push(product);
  }

  Object.assign(cart, newCart);
  await cart.save();
  return cart;
};

const removeProductInCartById = async (cartId, productId) => {
  const cart = await getCartById(cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  const newCart = cart;
  for (let i = 0; i < newCart.products.length; i++) {
    if (String(newCart.products[i].productId) === String(productId)) {
      newCart.products.splice(i, 1);
    }
  }

  Object.assign(cart, newCart);
  await cart.save();
  return cart;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteCartById = async (cartId) => {
  const cart = await getCartById(cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'cart not found');
  }
  await cart.remove();
  return cart;
};

module.exports = {
  createCart,
  queryCarts,
  getCartById,
  getCartByUserId,
  updateCartById,
  deleteCartById,
  removeProductInCartById,
};
