import { Router } from "express";
import lendersRecommendationsV1 from './api/v1/lenders-recommendations';
import customersV1 from './api/v1/customers';

const router = Router();

/**
 * V1 API routes.
 */
router.use('/v1/lenders-recommendations', lendersRecommendationsV1);
router.use('/v1/customers', customersV1);

export default router;
