import { Router } from "express";
import { postCustomers } from "../../../controllers/api/v1/customers";

const router = Router();

/**
 * Customer endpoints
 */
router.post('/', postCustomers);

export default router;
