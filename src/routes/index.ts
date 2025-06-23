import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { BannerRoutes } from '../app/modules/banner/banner.route';
import { ServiceCategoryRoutes } from '../app/modules/serviceCategory/serviceCategory.route';
import { ServiceRoutes } from '../app/modules/service/service.route';
import { FaqRoutes } from '../app/modules/faq/faq.route';
import { RatingRoutes } from '../app/modules/rating/rating.route';
import { BookmarkRoutes } from '../app/modules/bookmark/bookmark.route';
import { PortfolioRoutes } from '../app/modules/portfolio/portfolio.route';
import { BookingRoutes } from '../app/modules/bookings/bookings.route';
import { PaymentRoute } from '../app/modules/payment/payment.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/banners',
    route: BannerRoutes,
  },
  {
    path: '/service-categorys',
    route: ServiceCategoryRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/faqs',
    route: FaqRoutes,
  },
  {
    path: '/rating',
    route: RatingRoutes,
  },
  {
    path: '/bookmarks',
    route: BookmarkRoutes,
  },
  {
    path: '/portfolios',
    route: PortfolioRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoute,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
