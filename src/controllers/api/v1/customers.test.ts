import { Request, Response, } from "express-serve-static-core";
import { postCustomers } from './customers';
import { database } from "../../../db";

jest.mock('../../../db', () => ({
	database: jest.fn()
}))

describe('postCustomers', () => {
	describe('when validation failed', () => {
		it('returns status 400', async () => {
			const status = jest.fn().mockReturnThis();
			const send = jest.fn();
			const mockRequest = {
				body: {
					first_name: 'Sample',
					last_name: 'Tests',
				}
			} as Request;

			const mockResponse = {
				status,
				send,
			} as unknown as Response;

			await postCustomers(mockRequest, mockResponse);
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
					first_name: 'Sample',
					last_name: 'Tests',
					email: 'email@sample.com',
					employment_status: "Employed",
					employer_name: "Sample"
				}
			} as Request;

			const mockResponse = {
				status,
				send,
			} as unknown as Response;

			await postCustomers(mockRequest, mockResponse);
			expect(status).toHaveBeenCalledWith(500);
		})
	});
});
