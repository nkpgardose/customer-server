import { Router } from "express";
import { getLenders } from "../../../controllers/api/v1/lenders";

const router = Router();

router.get('/', getLenders);

export default router;