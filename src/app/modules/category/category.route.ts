import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryControllers } from './category.controller';
import { CategoryValidation } from './category.validation';

const route = express.Router();

route.get('/', CategoryControllers.getAllCategory);

route.post(
  '/',
  //   auth('admin'),
  validateRequest(CategoryValidation.categoryValidationSchema),
  CategoryControllers.createCategory,
);

route.patch(
  '/:id',
  //   auth('admin'),
  validateRequest(CategoryValidation.categoryUpdateValidationSchema),
  CategoryControllers.updateCategory,
);

route.delete(
  '/:id',
  // auth('admin'),
  CategoryControllers.deleteCategory,
);

route.get(
  '/all',
  // auth('admin'),
  CategoryControllers.getAllCategoryForAdmin,
);
export const CategoryRoutes = route;
