import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Created Category',
    data: result,
  });
});

const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: 'Fetched all category',
    data: result,
  });
});

const deleteCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.deleteCategoryFromDb(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: 'Deleted Category',
    data: result,
  });
});

const updateCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.UpdateCategoryFromDb(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: 'Updated the Category',
    data: result,
  });
});

const getAllCategoryForAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryForAdminFromDb();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: 'Fetched all category with active and inactive',
    data: result,
  });
});
export const CategoryControllers = {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
  getAllCategoryForAdmin,
};
