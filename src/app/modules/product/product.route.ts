import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const router = express.Router();

router.post(
  '/',
  // auth('admin'),
  validateRequest(ProductValidation.ProductValidationSchema),
  ProductController.CreateProduct,
);

router.patch(
  '/:id',
  // auth('admin'),
  validateRequest(ProductValidation.ProductUpdateValidationSchema),
  ProductController.UpdateProduct,
);

router.get('/:id', ProductController.GetSingleProduct);
router.get(
  '/:id/admin',
  auth('admin'),
  ProductController.GetSingleProductForAdmin,
);
router.delete('/:id', ProductController.DeleteProduct);
router.get('/', ProductController.GetAllProduct);
router.get(
  '/admin/all',
  auth('admin'),
  ProductController.GetAllProductForAdmin,
);

router.patch(
  '/featured/:id',
  auth('admin'),
  ProductController.MakeProductAsFeatured,
);

router.get('/arrival/all', ProductController.GetNewArrival);

router.get('/best-selling/all', ProductController.GetBestSellingProduct);

export const ProductRoutes = router;
