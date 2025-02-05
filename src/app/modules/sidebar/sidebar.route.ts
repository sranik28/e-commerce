import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SideBarController } from './sidebar.controller';
import { SideBarValidation } from './sidebar.validation';

const Sidebar = express.Router();

Sidebar.post(
  '/',
  validateRequest(SideBarValidation.SideBarCategoryValidationSchema),
  SideBarController.AddSideBarCategory,
);
Sidebar.post(
  '/sub',
  validateRequest(SideBarValidation.SubSideBarCategoryValidationSchema),
  SideBarController.AddSubSideBarCategory,
);

Sidebar.get('/', SideBarController.GetSideBarCategory);

Sidebar.get('/:id', SideBarController.GetSubCategoryDataByIdFromDb);
Sidebar.delete('/:id', SideBarController.DeleteCategory);
Sidebar.delete('/sub/:id', SideBarController.DeleteSubCategory);
export const SideBarRoute = Sidebar;
