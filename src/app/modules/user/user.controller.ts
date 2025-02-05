import httpStatus from 'http-status';

import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const SignInUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.DoingSigninIntoDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result.data,
  });
});
const ChangePassword: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const result = await UserServices.changePasswordIntoDb(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Changed password',
    data: result,
  });
});
const UpdateUser: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id } = req.user;
  const result = await UserServices.UpdateUserDataIntoDb(req.body, _id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Updated Password',
    data: result,
  });
});

const GetUserProfile: RequestHandler = catchAsync(async (req, res) => {
  // @ts-ignore
  const { _id: id } = req.user;
  const result = await UserServices.GetUserProfileFromDb(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Fetched User Profile data',
    data: result,
  });
});

const UploadFile: RequestHandler = catchAsync(async (req, res) => {
  // req.file
  // console.log(req.body)
  const result = await UserServices.UploadFileIntoCloudinary(
    req.file?.path as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Uploaded the file',
    data: result,
  });
});

const verifyToken: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.verifyTokenFromJwt(req.headers.token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token verified successfully',
    data: result,
  });
});

const GetRefreshToken: RequestHandler = catchAsync(async (req, res) => {
  // const { token } = req.body;
  // console.log(req.headers)
  const result = await UserServices.RefreshTokenApiFromJwt(req.headers.token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token verified successfully',
    data: {
      accessToken: result,
    },
  });
});

export const UserControllers = {
  createUser,
  SignInUser,
  ChangePassword,
  UpdateUser,
  GetRefreshToken,
  verifyToken,
  GetUserProfile,
  UploadFile,
};
