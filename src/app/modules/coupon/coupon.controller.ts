import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CouponServices } from './coupon.service';

const CreateCoupon: RequestHandler = catchAsync(async (req, res) => {
  const result = await CouponServices.CreateCouponIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Coupon',
    data: result,
  });
});

const UpdateCoupon: RequestHandler = catchAsync(async (req, res) => {
  const {id} = req.params
  const result = await CouponServices.UpdateCouponIntoDb(id,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated Coupon',
    data: result,
  });
});

const getSingleCoupon: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CouponServices.getSingleCouponFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Coupon',
    data: result,
  });
});

const useCoupon: RequestHandler = catchAsync(async (req, res) => {
  const { code, product, type } = req.params;
  const result = await CouponServices.UseCouponFromDb(code, product,type);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Used the coupon',
    data: result,
  });
});

const getCoupon:RequestHandler = catchAsync(async (req, res) => {
    const result = await CouponServices.getCouponFromdb()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetched all the coupon',
      data: result,
    });
  });
export const CouponController = {
  UpdateCoupon,
  getSingleCoupon,
  CreateCoupon,getCoupon,
  useCoupon,
};
