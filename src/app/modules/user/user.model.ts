import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

import config from '../../config';
import { TUser } from './user.interface';
const userSchema = new Schema<TUser>(
  {
    // image: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
      default: 'user',
    },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    gender: { type: String, enum: ['male', 'female'], required: false },
    dateofbirth: { type: String, required: false },
    address: { type: String, required: false },
    // photo: { type: String },
    photo: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// userSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this; // doc
//   // hashing password and save into DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// // set '' after saving password
// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  let salt = await bcrypt.genSaltSync(Number(config.bcrypt_salt_rounds));
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// // set '' after saving password
// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// userSchema.statics.isUserExistsByCustomId = async function (id: string) {
//   return await UserModel.findOne({ id }).select('+password');
// };

// userSchema.statics.isPasswordMatched = async function (
//   plainTextPassword,
//   hashedPassword,
// ) {
//   return await bcrypt.compare(plainTextPassword, hashedPassword);
// };

export const UserModel = model<TUser>('User', userSchema);
