import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { CartModel } from '../cart/cart.model';
import { CheckoutModel } from '../checkout/checkout.model';
import { WishlistModel } from '../wishlist/wishlist.model';
import { TAuth, TChangePassword, TUser } from './user.interface';
import { UserModel } from './user.model';
import { createToken } from './user.utils';

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  const savedUser = await UserModel.findById(result._id, '-isDeleted')
    .select('-password')
    .exec();
  return savedUser;
};

const DoingSigninIntoDb = async (payload: TAuth) => {
  // const {email} = payload
  const findUser = await UserModel.findOne(
    { email: payload.email },
    '-isDeleted',
  );
  // console.log(findUser)
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the account");
  }
  //  checking if the user already deleted

  const isDeleted = findUser.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This account is already deleted');
  }
  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    findUser.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Password doesn't matched");
  }
  const { password, ...userWithoutEmail } = findUser.toObject();
  const jwtPayload = userWithoutEmail;

  const accessToken = createToken(
    jwtPayload,
    config.secret_access_token as string,
    '2000hr',
  );
  const refreshToken = createToken(
    jwtPayload,
    config.secret_access_token as string,
    '10000hr',
  );

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.secret_access_token as string,
  //   "1hr"
  // );
  return { data: { ...userWithoutEmail, accessToken, refreshToken } };
};

const changePasswordIntoDb = async (payload: TChangePassword, user: TUser) => {
  const { email } = user;
  //   Matching old password and also the password on the database
  const findData = await UserModel.findOne({ email });
  // @ts-ignore
  const { password: encryptedPassword } = findData;
  console.log(encryptedPassword, payload.oldPassword);
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    encryptedPassword,
  );
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Password doesn't matched");
  }

  //  Converting new password into encrypted password
  let salt = await bcrypt.genSaltSync(Number(config.bcrypt_salt_rounds));
  let newEncryptedPassword = await bcrypt.hash(payload.newPassword, salt);
  // Updating password
  const UpdatePassword = await UserModel.findOneAndUpdate(
    { email: user.email },
    { password: newEncryptedPassword },
  );
  return UpdatePassword;
};

const UpdateUserDataIntoDb = async (payload: Partial<TUser>, id: string) => {
  const UpdateUser = await UserModel.findByIdAndUpdate(id, payload);
  const findUser = await UserModel.findOne({ email: UpdateUser?.email });
  return findUser;
};

const GetUserProfileFromDb = async (userId: string) => {
  const userData = await UserModel.findById(userId);
  const wishlist = await WishlistModel.find({ user: userId });
  const cart = await CartModel.find({ user: userId });
  const order = await CheckoutModel.find({ user: userId });
  const result = { user: userData, wishlist: wishlist, cart: cart };

  return result;
};

const UploadFileIntoCloudinary = async (payload: string) => {
  // const findUser = await User.findOne({ email: payload.email });
  cloudinary.config({
    cloud_name: 'dnjlwwcmo',
    api_key: '113954936769183',
    api_secret: 'qHD9HwMjRugjnzMqespYnsFI8jE', // Click 'View API Keys' above to copy your API secret
  });

  const uploadFile = await cloudinary.uploader.upload(payload);

  return uploadFile.secure_url;
};

const verifyTokenFromJwt = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.secret_access_token as string,
  ) as JwtPayload;
  const { email, isDeleted } = decoded;
  const findUser = await UserModel.findOne({
    // email: email,
    // isDeleted: false,
    email: email,
    isDeleted: false,
  });
  if (!findUser) {
    throw new Error("Cloudn't find the user");
  }
  return findUser;
};

const RefreshTokenApiFromJwt = async (token: string) => {
  if (!token) {
    throw new Error("You don't have token");
  }
  const decoded = jwt.verify(
    token,
    config.secret_access_token as string,
  ) as JwtPayload;

  const { _id } = decoded;
  const find = await UserModel.findById(_id);
  if (!find) {
    throw new Error("Couldn't find the user");
  }
  console.log(find.toObject());
  const accessToken = createToken(
    find.toObject(),
    config.secret_access_token as string,
    '100hr',
  );
  return accessToken;
};

export const UserServices = {
  createUserIntoDB,
  DoingSigninIntoDb,
  changePasswordIntoDb,
  UpdateUserDataIntoDb,
  GetUserProfileFromDb,
  UploadFileIntoCloudinary,
  RefreshTokenApiFromJwt,
  verifyTokenFromJwt,
};
