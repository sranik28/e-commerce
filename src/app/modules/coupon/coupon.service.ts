import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCoupon } from './coupon.interface';
import { CouponModel } from './coupon.model';

const CreateCouponIntoDb = async (payload: TCoupon) => {
  const create = await CouponModel.create(payload);
  return create;
};

const UpdateCouponIntoDb = async (id: string, payload: Partial<TCoupon>) => {
  const find = await CouponModel.findById(id);
  if (!find) {
    throw new AppError(httpStatus.NOT_FOUND, 'Could not found the coupon');
  }
  const result = await CouponModel.findOneAndUpdate({ _id: id }, payload);
  return result;
};

const getSingleCouponFromDb = async (id: string) => {
  const result = await CouponModel.findOne({ _id: id });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Could not found the coupon');
  }
  return result;
};

const UseCouponFromDb = async (code: string, product: string, type: string) => {
   const result = await CouponModel.findOne({ CODE: code });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the coupon");
  } else if (result.limit <= 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the coupon");
  } else if (type == 'entire' && result.type == 'custom') {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the coupon");
  } else if (type == 'entire' && result.type == 'entire') {
    await CouponModel.findOneAndUpdate(
      { _id: result._id },
      { $inc: { limit: -1 } },
    );
    return result;
  } else if (type == 'custom' && result.type == 'custom') {
    const findProduct = result.product.includes(product);
    if (findProduct) {
      await CouponModel.findOneAndUpdate(
        { _id: result._id },
        { $inc: { limit: -1 } },
      );
      return result;
    } else {
      throw new AppError(httpStatus.NOT_FOUND, 'No coupon available');
    }
  } else if (type == 'custom' && result.type == 'entire') {
    await CouponModel.findOneAndUpdate(
      { _id: result._id },
      { $inc: { limit: -1 } },
    );
    return result;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the coupon");
  }
};

const getCouponFromdb = async () => {
  const find = await CouponModel.find();
  return find;
};

export const CouponServices = {
  CreateCouponIntoDb,
  getSingleCouponFromDb,
  UpdateCouponIntoDb,
  getCouponFromdb,
  UseCouponFromDb,
};
