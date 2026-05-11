// banner.routes.js
import { Router } from 'express';
import {
  getActiveBanners,
  listBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from './banner.controller.js';

// ⚠️ Anpassen: Default-Export oder Named-Export aus admin.middleware.js
// Wenn deine Middleware z.B. `requireAdmin` heißt:
//   import { requireAdmin } from './admin.middleware.js';
// Wenn sie default-exportiert ist:
//   import requireAdmin from './admin.middleware.js';
import { requireAdmin } from './admin.middleware.js';

export const publicBannerRouter = Router();
publicBannerRouter.get('/banners', getActiveBanners);

export const adminBannerRouter = Router();
adminBannerRouter.get   ('/banners',     requireAdmin, listBanners);
adminBannerRouter.post  ('/banners',     requireAdmin, createBanner);
adminBannerRouter.put   ('/banners/:id', requireAdmin, updateBanner);
adminBannerRouter.delete('/banners/:id', requireAdmin, deleteBanner);
