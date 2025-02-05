import { Router } from 'express';
import { BannerRoutes } from '../modules/banner/banner.route';
import { CartRoutes } from '../modules/cart/cart.route';
import { CheckoutRoutes } from '../modules/checkout/checkout.route';
import { ProductRoutes } from '../modules/product/product.route';
import { SideBarRoute } from '../modules/sidebar/sidebar.route';
import { AuthRoutes, UserRoutes } from '../modules/user/user.route';
import { WishlistRoutes } from '../modules/wishlist/wishlist.route';
import { ReviewRoutes } from './../modules/review/review.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { CouponRoutes } from '../modules/coupon/coupon.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/checkout',
    route: CheckoutRoutes,
  },
  {
    path: '/banner',
    route: BannerRoutes,
  },
  {
    path: '/sidebar',
    route: SideBarRoute,
  },
  {
    path:'/category',
    route:CategoryRoutes
  },
  {
    path:'/coupon',
    route:CouponRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
