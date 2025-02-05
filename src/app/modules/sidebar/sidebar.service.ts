import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { generateSlug } from '../product/product.utils';
import { TSideBarCategory, TSubSideBarCategory } from './sidebar.interface';
import { SideBarCategory, SubSideBarCategory } from './sidebar.model';

const AddSideBarCategoryIntoDb = async (payload: TSideBarCategory) => {
  const find = await SideBarCategory.findOne({ name: payload.name });
  if (find) {
    throw new AppError(httpStatus.FOUND, 'Choose a different name');
  }

  const result = await SideBarCategory.create({
    ...payload,
    href: `/${generateSlug(payload.name)}`,
  });
  return result;
};

const AddSubSideBarCategoryIntoDb = async (payload: TSubSideBarCategory) => {
  const find = await SubSideBarCategory.findOne({ name: payload.name });
  if (find) {
    throw new AppError(httpStatus.FOUND, 'Choose a different name');
  }
  const findFromSideBar = await SideBarCategory.findById(payload.refCategory);
  const findFromSubSideBar = await SubSideBarCategory.findById(
    payload.refCategory,
  );
  if (!findFromSideBar && !findFromSubSideBar) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Not found the refered sidebar or sub sidebar category',
    );
  }
  const result = await SubSideBarCategory.create({
    ...payload,
    href: `/${generateSlug(payload.name)}`,
  });
  if (!findFromSideBar) {
    const updateData = await SubSideBarCategory.findOneAndUpdate(
      { _id: payload.refCategory },
      { $push: { subItem: result._id } },
    );
    console.log('Not found data');
  } else {
    const updateData = await SideBarCategory.findOneAndUpdate(
      { _id: payload.refCategory },
      { $push: { subItem: result._id } },
    );
    console.log('found data');
  }

  return result;
};

const GetSideBarCategoryFromDb = async () => {
  const getSideBarCategory = await SideBarCategory.find().populate({
    path: 'subItem', // First populate the 'books' field
    populate: {
      path: 'subItem', // Then populate the 'publisher' field within 'books'
    },
  });
  return getSideBarCategory;
};

const GetSubCategoryDataByIdFromDb = async (id: string) => {
  const getSubSideBarCategory = await SubSideBarCategory.find({
    refCategory: id,
  });
  return getSubSideBarCategory;
};

const DeleteCategoryFromDb = async (id: string) => {
  const findData = await SideBarCategory.findOne({ _id: id });
  if (!findData) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the data");
  }
  const DeleteCategory = await SideBarCategory.deleteOne({ _id: id });
  return DeleteCategory;
};
const DeleteSubCategoryFromDb = async (id: string) => {
  const findData = await SubSideBarCategory.findOne({ _id: id });
  if (!findData) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the data");
  }
  const DeleteCategory = await SubSideBarCategory.deleteOne({ _id: id });
  return DeleteCategory;
};

export const SideBarCategoryService = {
  AddSideBarCategoryIntoDb,
  AddSubSideBarCategoryIntoDb,
  GetSideBarCategoryFromDb,
  GetSubCategoryDataByIdFromDb,
  DeleteCategoryFromDb,
  DeleteSubCategoryFromDb,
};
