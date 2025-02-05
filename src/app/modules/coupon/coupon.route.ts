import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CouponValidation } from './coupon.validation';
import { CouponController } from './coupon.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(CouponValidation.CouponValidationSchema),
  CouponController.CreateCoupon,
);

router.patch(
  '/update/:id',
  auth('admin'),
  validateRequest(CouponValidation.CouponUpdateValidationSchema),
  CouponController.UpdateCoupon,
);

router.get('/get/:id', auth('admin'), CouponController.getSingleCoupon);

router.get('/use/:type/:code/:product', CouponController.useCoupon);

router.get('/',auth('admin'), CouponController.getCoupon);

export const CouponRoutes = router;
