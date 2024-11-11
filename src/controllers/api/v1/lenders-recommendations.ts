import { Request, Response } from 'express-serve-static-core';
import { database } from '../../../db';
import { fees, lenders, loanOffers } from '../../../db/schema';
import { eq } from 'drizzle-orm';

type FeePayload = {
	id: number;
	amount: number;
	type: 'processing' | 'application';
};

type Lender = {
	id: number;
	name: string;
	repayment: string;
	interestRate: string;
	fees: FeePayload[];
};

type Lenders = Lender[];

/**
 * GET /api/v1/lenders-recommendations
 */
export async function getLendersRecommendations(
	req: Request,
	res: Response,
): Promise<void> {
	// Request payload most probably come from personal and loan details.
	try {
		const result = await database
			.select()
			.from(lenders)
			.leftJoin(loanOffers, eq(lenders.id, loanOffers.lender_id))
			.leftJoin(fees, eq(loanOffers.id, fees.loan_offer_id));

		const formattedResult: Lenders = result.map((item) => ({
			id: item.lenders.id,
			name: item.lenders.name,
			repayment: `$${item.loan_offers?.repayment_value} ${item.loan_offers?.repayment_frequency}`,
			interestRate: item.loan_offers?.interest_rate
				? `${(Number(item.loan_offers.interest_rate) * 100).toFixed(2)}% ${item.loan_offers?.interest_frequency}`
				: 'N/A',
			fees: item.fees
				? [
						{
							id: item.fees.id,
							amount: Number(item.fees.amount),
							type: item.fees.category as 'processing' | 'application',
						},
					]
				: [],
		}));

		res.status(200).send(formattedResult);
	} catch (error) {
		console.error('Error inserting customer:', error);
		res.status(500).send({
			errors: {
				network: {
					message: 'Internal server error',
				},
			},
		});
	}
}

/**
 * POST /api/v1/lenders-recommendations
 */
export async function postLendersRecommendations(
	req: Request,
	res: Response,
): Promise<void> {
	// Request payload most probably come from personal and loan details.
	try {
		const result = await database
			.select()
			.from(lenders)
			.leftJoin(loanOffers, eq(lenders.id, loanOffers.lender_id))
			.leftJoin(fees, eq(loanOffers.id, fees.loan_offer_id));

		const formattedResult: Lenders = result.map((item) => ({
			id: item.lenders.id,
			name: item.lenders.name,
			repayment: `$${item.loan_offers?.repayment_value} ${item.loan_offers?.repayment_frequency}`,
			interestRate: item.loan_offers?.interest_rate
				? `${(Number(item.loan_offers.interest_rate) * 100).toFixed(2)} ${item.loan_offers?.interest_frequency}`
				: 'N/A',
			fees: item.fees
				? [
						{
							id: item.fees.id,
							amount: Number(item.fees.amount),
							type: item.fees.category as 'processing' | 'application',
						},
					]
				: [],
		}));

		res.status(200).send(formattedResult);
	} catch (error) {
		console.error('Error inserting customer:', error);
		res.status(500).send({
			errors: {
				network: {
					message: 'Internal server error',
				},
			},
		});
	}
}
