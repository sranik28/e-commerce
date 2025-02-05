import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ProductModel } from '../product/product.model';
import { TCheckout, TStatusCheckout } from './checkout.interface';
import { CheckoutModel } from './checkout.model';
import mongoose from 'mongoose';

const createOrderInToDb = async (payload: TCheckout, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const productId = payload.products.map((product) => product.product);
    const quantities = payload.products.map((item) => item.quantity);

    // Check if all products are available
    const products = await ProductModel.find({
      _id: { $in: productId },
    }).session(session);
    if (products.length != productId.length) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Some products are not available',
      );
    }

    // Create the order
    const create = await CheckoutModel.create([{ ...payload, user: userId }], {
      session,
    });

    // Update stock quantities
    const updatePromises = payload.products.map(async (product, idx) => {
      // Find the product by ID
      const foundProduct = await ProductModel.findById(product.product).session(
        session,
      );

      // Check if the product exists and has enough stock
      if (!foundProduct || foundProduct.stock < quantities[idx]) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Not enough stock for product ${product.product}`,
        );
      }

      // Prepare update operation
      return ProductModel.findByIdAndUpdate(
        product.product,
        {
          $inc: { stock: -quantities[idx] },
          $set: { inStock: foundProduct.stock - quantities[idx] > 0 },
        },
        { session },
      );
    });

    // Execute all update operations
    await Promise.all(updatePromises);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return create;
  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const getMyOrderFromDb = async (id: string) => {
  const Order = await CheckoutModel.find({ user: id })
    .populate('products')
    .populate({
      path: 'products.product', // path to the field that needs to be populated
    })
    .lean();
  return Order;
};

const getAllOrderFromDb = async () => {
  const Order = await CheckoutModel.find()
    .populate('products')
    .populate({
      path: 'products.product', // path to the field that needs to be populated
    })
    .lean();
  return Order;
};
const UpdateStatusToDb = async (id: string, payload: TStatusCheckout) => {
  const result = await CheckoutModel.findOneAndUpdate({ _id: id }, payload);
  return result;
};

const CancelOrderFromDb = async (id: string) => {
  const result = await CheckoutModel.deleteOne({ _id: id });
  return result;
};

const GetOrderDetailsFromDb = async (id: string) => {
  const result = await CheckoutModel.findById(id)
    .populate('products')
    .populate({
      path: 'products.product', // path to the field that needs to be populated
    })
    .lean();
  return result;
};

export const CheckoutService = {
  createOrderInToDb,
  getMyOrderFromDb,
  getAllOrderFromDb,
  UpdateStatusToDb,
  CancelOrderFromDb,
  GetOrderDetailsFromDb,
};