import { Router } from 'express';
import { postLoanDetails } from '../../../controllers/api/v1/loan-details';

const router = Router();

/**
 * Loan details endpoints
 */
router.post('/', postLoanDetails);

export default router;
