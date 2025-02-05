import { TCategory } from './category.interface';
import { CategoryModel } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await CategoryModel.create(payload);
  return result;
};

const getAllCategoryFromDb = async () => {
  const result = await CategoryModel.find({active : true});
  return result;
};

const deleteCategoryFromDb = async (id: string) => {
  const result = await CategoryModel.deleteOne({ _id: id });
  return result;
};

const UpdateCategoryFromDb = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const result = await CategoryModel.findOneAndUpdate({ _id: id }, payload);
  return result;
};

const getAllCategoryForAdminFromDb = async()=>{
    const result = await CategoryModel.find()
    return result
}



export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDb,
  deleteCategoryFromDb,
  UpdateCategoryFromDb,getAllCategoryForAdminFromDb
};
