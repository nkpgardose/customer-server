import { Request, Response, RequestHandler } from "express-serve-static-core";
import { randomUUID, UUID } from "node:crypto";

type FeePayload = {
	id: UUID,
	amount: number,
	type: 'processing' | 'application'
}

type Lender = {
	id: UUID,
	name: string,
	repayment: number,
	interestRate: number,
	fees: FeePayload[],
}

type Lenders = Lender[];

const lendersResult: Lenders = [
	{ id: randomUUID(), name: 'Lender A', repayment: 300, interestRate: 5.5, fees: [{ id: randomUUID(), amount: 10, type: 'processing' }]},
	{ id: randomUUID(), name: 'Lender B', repayment: 290, interestRate: 5, fees: [{ id: randomUUID(), amount: 10, type: 'application' }]},
	{ id: randomUUID(), name: 'Lender C', repayment: 310, interestRate: 6, fees: [] },
];

/**
 * GET /api/v1/lenders
 */
export function getLenders(req: Request, res: Response): void {
	res.status(200).send(lendersResult);
}
