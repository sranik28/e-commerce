import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

const CreateProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Product',
    data: result,
  });
});

const UpdateProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.updateProductIntoDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated Product',
    data: result,
  });
});
const GetSingleProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProductFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single product',
    data: result,
  });
});

const GetSingleProductForAdmin : RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.GetSingleProductFromDbForAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single product for admin',
    data: result,
  });
});

const DeleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.DeleteProductFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted Product',
    data: result,
  });
});

const GetAllProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProductFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all product',
    data: result,
  });
});

const GetAllProductForAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProductForAdminFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched all product from admin',
    data: result,
  });
});
const MakeProductAsFeatured: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.MakeProductAsFeaturedIntoDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Made Product as featured',
    data: result,
  });
});
const GetNewArrival: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.GetNewArrivalFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched New Arrival product',
    data: result,
  });
});

const GetBestSellingProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.GetBestSellingProductFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Fetched Best selling product',
    data: result,
  });
});


export const ProductController = {
  CreateProduct,
  UpdateProduct,
  GetNewArrival,
  GetBestSellingProduct,
  GetSingleProduct,GetSingleProductForAdmin,
  DeleteProduct,
  MakeProductAsFeatured,
  GetAllProductForAdmin,
  GetAllProduct,
};
