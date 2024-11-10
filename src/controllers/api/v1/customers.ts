import { Request, Response, } from "express-serve-static-core";

/**
 * POST /api/v1/customers
 */
export function postCustomers(req: Request, res: Response): void {
	res.status(200).send({});
}
