import { Request, Response, } from "express-serve-static-core";
import { postCustomers } from './customers';
import { database } from "../../../db";

jest.mock('../../../db', () => ({
	database: {
		insert: jest.fn()
	}
}))

describe('postCustomers', () => {
	describe('when validation failed', () => {
		it('returns status 400', async () => {
			jest.spyOn(console, 'error').mockImplementation(() => {});
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
			jest.spyOn(console, 'error').mockImplementation(() => {});
			jest.mocked(database.insert).mockImplementationOnce(() => {
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

	describe('when validation passes', () => {
		it('returns personal detail payload with id', async () => {
			// @ts-ignore
			jest.mocked(database.insert).mockReturnValueOnce({
				values: jest.fn().mockReturnValueOnce({
					returning: jest.fn().mockReturnValueOnce({
						id: 1,
						first_name: 'Sample',
						last_name: 'Tests',
						email: 'email@sample.com',
						employment_status: "Employed",
						employer_name: "Sample"
					})
				})
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

			expect(status).toHaveBeenCalledWith(200);
		});
	});
});
