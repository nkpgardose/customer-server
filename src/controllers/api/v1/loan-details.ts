import { Request, Response } from 'express-serve-static-core';
import { insertLoanDetailsSchema, loanDetails } from '../../../db/schema';
import { database } from '../../../db';
import { z } from 'zod';

type InsertLoanDetailsInput = z.infer<typeof insertLoanDetailsSchema>;

/**
 * POST /api/v1/customers
 */
export async function postLoanDetails(
	req: Request<{}, {}, InsertLoanDetailsInput>,
	res: Response,
): Promise<void> {
	const { customer_id, price, deposit, loan_purpose, loan_term } = req.body;

	const loanDetailsResult = insertLoanDetailsSchema.safeParse({
		customer_id,
		price,
		deposit,
		loan_purpose,
		loan_term,
	});

	if (!loanDetailsResult.success) {
		res.status(400).send({
			errors: {
				network: {
					message: 'Invalid loan details input',
				},
			},
		});

		return;
	}

	try {
		const dbPayload = await database
			.insert(loanDetails)
			.values(loanDetailsResult.data)
			.returning();

		res.status(200).send(dbPayload[0]);
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
