import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BannerValidation, SpecialBannerValidation } from './banner.validation';
import { BannersController } from './banner.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post('/normal',auth('admin'),validateRequest(BannerValidation.BannerValidationSchema),BannersController.CreateBanner)

router.post('/special',auth('admin'),validateRequest(SpecialBannerValidation.SpecialBannerValidationSchema),BannersController.CreateSpecialBanner)

router.patch('/normal/:id',auth('admin'),validateRequest(BannerValidation.BannerUpdateValidationSchema),BannersController.UpdatedBanner)

router.patch('/special/:id',auth('admin'),validateRequest(SpecialBannerValidation.SpecialBannerUpdateValidationSchema),BannersController.UpdateSpecialBanner)

router.delete('/normal/:id',auth('admin'),BannersController.deleteBanner)

router.delete('/special/delete',auth('admin'),BannersController.deleteSpecialBanner)

router.get('/normalAll',BannersController.GetAllBanner)

router.get('/specialAll',BannersController.getSpeicalBanner)

router.get('/admin/normal',auth('admin'),BannersController.getAllBannerForAdmin)

router.get('/admin/special',auth('admin'),BannersController.getSpecialBannerForAdmin)

router.patch('/switch/:id',auth('admin'),BannersController.SwitchActive)

router.get('/single/normal/:id',auth('admin'),BannersController.getSingleBanner)

export const BannerRoutes = router;


