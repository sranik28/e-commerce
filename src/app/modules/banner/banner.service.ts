import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { ProductModel } from '../product/product.model';
import { TBanner, TSpecialBanner } from './banner.interface';
import { BannerModel, SpecialBannerModel } from './banner.model';

const createBannerIntoDB = async (payload: TBanner) => {
  const result = await BannerModel.create(payload);
  return result;
};

const createSpecialBannerIntoDb = async (payload: TSpecialBanner) => {
  const find = await SpecialBannerModel.find();
  if (find.length > 0) {
    throw new AppError(
      httpStatus.INSUFFICIENT_STORAGE,
      'You can just add 1 special banner',
    );
  }
  const findProduct = await ProductModel.findOne({
    _id: new mongoose.Types.ObjectId(payload.product),
  });
  if (!findProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the product");
  }
  const result = await SpecialBannerModel.create(payload);
  return result;
};

const updateBannerFromDb = async (id: string, payload: Partial<TBanner>) => {
  const check = await BannerModel.findById(id);
  if (!check) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the banner");
  }
  const result = await BannerModel.findByIdAndUpdate(id, payload);
  return result;
};

const updateSpcialBannerFromDb = async (
  id: string,
  payload: Partial<TBanner>,
) => {
  const check = await SpecialBannerModel.findById(id);
  if (!check) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Couldn't found the special banner",
    );
  }
  const result = await SpecialBannerModel.findByIdAndUpdate(id, payload);
  return result;
};

const deleteBannerIntoDb = async (id: string) => {
  const find = await BannerModel.findById(id);
  if (!find) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the banner");
  }
  const result = await BannerModel.deleteOne({ _id: id });
  return result;
};

const deleteSpecialBannerFromDb = async () => {
  const deleteBanner = SpecialBannerModel.deleteMany();
  return deleteBanner;
};

const getAllBannerFromDb = async () => {
  const result = await BannerModel.find({ isActive: true });
  return result;
};
const getAllBannerForAdmin = async () => {
  const result = await BannerModel.find();
  return result;
};

const getSpecialBannerFromDb = async () => {
  const result = await SpecialBannerModel.find({
    time: { $gt: new Date().toISOString() },
  }).populate('product');
  return result;
};

const getSpecialBannerForAdminFromDb = async () => {
  const result = await SpecialBannerModel.find().populate('product');
  return result;
};
const SwitchActiveFromDb = async (id: string) => {
  const find = await BannerModel.findById(id);
  if (!find) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the banner");
  }
  const update = await BannerModel.findByIdAndUpdate(id, {
    isActive: !find.isActive,
  });
  return update;
};

const getSingleBannerFromDb = async (id: string) => {
  const result = await BannerModel.findOne({ _id: id });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the banner");
  }
  return result;
};
export const BannerService = {
  createBannerIntoDB,
  deleteBannerIntoDb,
  getAllBannerFromDb,
  SwitchActiveFromDb,
  createSpecialBannerIntoDb,
  getAllBannerForAdmin,
  getSpecialBannerFromDb,
  updateSpcialBannerFromDb,
  deleteSpecialBannerFromDb,
  getSingleBannerFromDb,
  updateBannerFromDb,
  getSpecialBannerForAdminFromDb,
};
