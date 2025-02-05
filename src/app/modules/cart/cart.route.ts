import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CartController } from './cart.controller';
import { CartValidation } from './cart.validation';

const router = express.Router();

router.post(
  '/',
  auth('user', 'admin'),
  validateRequest(CartValidation.CartValidationSchema),
  CartController.AddedProduct,
);
router.get('/', auth('user', 'admin'), CartController.GetCartProduct);

router.patch('/add/:id', auth('user', 'admin'), CartController.AddQuantity);
router.patch(
  '/reduce/:id',
  auth('user', 'admin'),
  CartController.ReduceQuantity,
);
router.delete(
  '/delete/:id',
  auth('user', 'admin'),
  CartController.DeleteProductCart,
);
router.delete('/reset', auth('admin', 'user'), CartController.ResetCart);
export const CartRoutes = router;
