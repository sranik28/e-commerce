import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SideBarCategoryService } from './sidebar.service';

const AddSideBarCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await SideBarCategoryService.AddSideBarCategoryIntoDb(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created SideBar Category',
    data: result,
  });
});

const AddSubSideBarCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await SideBarCategoryService.AddSubSideBarCategoryIntoDb(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Sub SideBar Category',
    data: result,
  });
});

const GetSideBarCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await SideBarCategoryService.GetSideBarCategoryFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all the sidebar category',
    data: result,
  });
});

const GetSubCategoryDataByIdFromDb: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result =
      await SideBarCategoryService.GetSubCategoryDataByIdFromDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetched all the sub sidebar category',
      data: result,
    });
  },
);
const DeleteCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SideBarCategoryService.DeleteCategoryFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted the Category',
    data: result,
  });
});
const DeleteSubCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SideBarCategoryService.DeleteSubCategoryFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Sub Category',
    data: result,
  });
});
export const SideBarController = {
  AddSideBarCategory,
  AddSubSideBarCategory,
  GetSideBarCategory,
  GetSubCategoryDataByIdFromDb,
  DeleteCategory,
  DeleteSubCategory,
};
