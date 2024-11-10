import { Router } from "express";
import lendersV1 from './api/v1/lenders';

const router = Router();

/**
 * V1 API routes.
 */
router.use('/v1/lenders', lendersV1);

export default router;
