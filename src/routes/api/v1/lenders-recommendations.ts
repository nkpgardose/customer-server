import { Router } from 'express';
import {
	getLendersRecommendations,
	postLendersRecommendations,
} from '../../../controllers/api/v1/lenders-recommendations';

const router = Router();

/**
 * Lender's recommendations
 */
router.get('/', getLendersRecommendations);
router.post('/', postLendersRecommendations);

export default router;
