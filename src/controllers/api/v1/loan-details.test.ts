import { Request, Response, } from "express-serve-static-core";
import { postLoanDetails } from './loan-details';
import { database } from "../../../db";

jest.mock('../../../db', () => ({
	database: jest.fn()
}))

describe('postLoanDetails', () => {
	describe('when validation failed', () => {
		it('returns status 400', async () => {
			const status = jest.fn().mockReturnThis();
			const send = jest.fn();
			const mockRequest = {
				body: {
					customer_id: 1
				}
			} as Request;

			const mockResponse = {
				status,
				send,
			} as unknown as Response;

			await postLoanDetails(mockRequest, mockResponse);
			expect(status).toHaveBeenCalledWith(400);
		});

		it('returns network error, status 500', async () => {
			// @ts-ignore
			jest.mocked(database).mockImplementationOnce(() => {
				throw new Error('Network error');
			})

			const status = jest.fn().mockReturnThis();
			const send = jest.fn();
			const mockRequest = {
				body: {
					customer_id: 1,
					price: 10000,
					deposit: 1000,
					loan_purpose: 'Vehicle',
					loan_term: 2,
				}
			} as Request;

			const mockResponse = {
				status,
				send,
			} as unknown as Response;

			await postLoanDetails(mockRequest, mockResponse);
			expect(status).toHaveBeenCalledWith(500);
		})
	});
});
