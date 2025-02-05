import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CartModel } from '../cart/cart.model';
import { ProductModel } from '../product/product.model';
import { ReviewModel } from '../review/review.model';
import { WishlistModel } from '../wishlist/wishlist.model';
import { TProduct } from './product.interface';
import { generateSlug } from './product.utils';

const createProductIntoDB = async (payload: TProduct) => {
  const find = await ProductModel.findOne({
    slug_id: generateSlug(payload.title),
  });
  if (find) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Try a different name for this product',
    );
  }
  const result = await ProductModel.create({
    ...payload,
    slug_id: generateSlug(payload.title),
  });
  return result;
};

const updateProductIntoDb = async (id: string, payload: Partial<TProduct>) => {
  const check = await ProductModel.findOne({ slug_id: id });
  if (!check) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the product");
  }
  const update = await ProductModel.findOneAndUpdate({ slug_id: id }, payload);
  const result = await ProductModel.findOne({ slug_id: id });
  return result;
};

const getSingleProductFromDb = async (id: string) => {
  const product = await ProductModel.findOne({ slug_id: id });
  if (!product || !product.visibility || new Date(product.date) > new Date()) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't find the product");
  }
  const review = await ReviewModel.find({ ProductId: product._id });
  const RelatedProducts = await ProductModel.find({
    category: product.category,
  });
  const data = { result: product, review: review, RelatedProducts };
  return data;
};
const GetSingleProductFromDbForAdmin = async (id: string) => {
  const product = await ProductModel.findOne({ slug_id: id });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't find the product");
  }

  return product;
};

const DeleteProductFromDb = async (id: string) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the product");
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await ProductModel.deleteOne({ _id: id }).session(session);
    const deleteReviews = await ReviewModel.deleteMany({
      ProductId: id,
    }).session(session);
    const deleteCart = await CartModel.deleteMany({ product: id }).session(
      session,
    );
    const wishlist = await WishlistModel.deleteMany({ product: id }).session(
      session,
    );
    await session.commitTransaction();
    session.endSession();
    return { result, deleteReviews, deleteCart, wishlist };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete the product',
    );
  }
};
const getAllProductFromDb = async (query: Partial<TProduct>) => {
  const result = new QueryBuilder(
    ProductModel.find({
      visibility: true,
      date: { $lt: new Date().toISOString() }, // Ensure the date is in the past
    }).populate('reviews'),
    query,
  )
    .filter()
    .sort()
    .fields();
  const student = await result.modelQuery;
  return student;
};

const getAllProductForAdminFromDb = async (query: Partial<TProduct>) => {
  const result = new QueryBuilder(
    ProductModel.find().populate('reviews'),
    query,
  )
    .filter()
    .sort()
    .fields();
  const student = await result.modelQuery;
  return student;
};

const MakeProductAsFeaturedIntoDb = async (productId: string) => {
  const findData = await ProductModel.findOne({ _id: productId });
  if (!findData) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the product");
  }
  const result = await ProductModel.findByIdAndUpdate(productId, {
    featured: !findData?.featured,
  });
  return result;
};

const GetNewArrivalFromDb = async () => {
  const result = await ProductModel.find({
    visibility: true,
    date: { $gt: new Date().toISOString() },
  });
  return result;
};

const GetBestSellingProductFromDb = async () => {
  const result = await ProductModel.find({
    visibility: true,
    date: { $lt: new Date().toISOString() }, // Ensure the date is in the past
  }).limit(6);
  return result;
};

export const ProductService = {
  createProductIntoDB,
  updateProductIntoDb,
  getSingleProductFromDb,
  MakeProductAsFeaturedIntoDb,
  DeleteProductFromDb,
  getAllProductForAdminFromDb,
  getAllProductFromDb,
  GetSingleProductFromDbForAdmin,
  GetNewArrivalFromDb,
  GetBestSellingProductFromDb,
};
