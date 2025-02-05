import express from 'express';
import { UserControllers } from './user.controller';

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { uploader } from './user.utils';
import { UserValidation } from './user.validation';

const Auth = express.Router();
const User = express.Router();
Auth.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);
Auth.post(
  '/signin',
  validateRequest(UserValidation.AuthValidationSchema),
  UserControllers.SignInUser,
);
Auth.patch(
  '/changepassword',
  auth('admin', 'user'),
  validateRequest(UserValidation.ChangePasswordValidationSchema),
  UserControllers.ChangePassword,
);

User.patch(
  '/',
  auth('admin', 'user'),
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserControllers.UpdateUser,
);

User.get('/get-profile', auth('admin', 'user'), UserControllers.GetUserProfile);
User.post('/upload', uploader.single('file'), UserControllers.UploadFile);
Auth.get('/verify', UserControllers.verifyToken);

Auth.get('/refresh-token', UserControllers.GetRefreshToken);




export const UserRoutes = User;
export const AuthRoutes = Auth;
