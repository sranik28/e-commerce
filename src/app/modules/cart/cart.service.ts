import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ProductModel } from '../product/product.model';
import { TCart } from './cart.interface';
import { CartModel } from './cart.model';

const AddProductToCartIntoDb = async (payload: TCart, userId: string) => {
  const product = await ProductModel.findById(payload.product);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't find the product");
  }

  // If product already exists in cart, update the quantity instead of adding a new entry
  const existingCart = await CartModel.findOne({
    product: payload.product,
    user: userId,
    color: payload.color,
    size: payload.size,
  });
  if (existingCart) {
    existingCart.quantity += payload.quantity || 1; // Increment quantity if it exists
    await existingCart.save();
    return existingCart;
  }

  const newCartItem = await CartModel.create({ ...payload, user: userId });
  return newCartItem;
};

const GetAllProductFromCart = async (userId: string) => {
  const cartItems = await CartModel.find({ user: userId }).populate('product');
  return cartItems;
};

const UpdateQuantity = async (cartId: string, increment: boolean) => {
  const cartItem = await CartModel.findOne({
    _id: cartId,
  });
  if (!cartItem) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Couldn't find the product in the cart",
    );
  }

  cartItem.quantity += increment ? 1 : -1;

  if (cartItem.quantity <= 0) {
    await CartModel.deleteOne({
      _id: cartId,
    });
    return { message: 'Product removed from cart' };
  }

  await cartItem.save();
  return cartItem;
};

const UpdateAddQuantity = async (cartId: string) => {
  return UpdateQuantity(cartId, true);
};

const UpdateReduceQuantity = async (cartId: string) => {
  return UpdateQuantity(cartId, false);
};

const DeleteProductCartIntoDb = async (cartId: string) => {
  const result = await CartModel.deleteOne({
    _id: cartId,
  });
  return result;
};

const ResetCartFromDb = async (userid: string) => {
  const result = await CartModel.deleteMany({
    user: userid,
  });
  return result;
};

export const CartService = {
  AddProductToCartIntoDb,
  GetAllProductFromCart,
  UpdateAddQuantity,
  ResetCartFromDb,
  DeleteProductCartIntoDb,
  UpdateReduceQuantity,
};
