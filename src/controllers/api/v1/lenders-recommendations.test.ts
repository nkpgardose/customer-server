import { Request, Response, } from "express-serve-static-core";
import { getLendersRecommendations } from './lenders-recommendations';
import { database } from "../../../db";

jest.mock('../../../db', () => ({
	database: jest.fn()
}))

describe('getLendersRecommendations', () => {
  describe('when network failed', () => {
    it('returns status 500', async () => {
      // @ts-ignore
      jest.mocked(database).mockImplementationOnce(() => {
        throw new Error('Network error');
      });
      const status = jest.fn().mockReturnThis();
      const send = jest.fn();
      const mockRequest = {} as Request;
      const mockResponse = {
        status,
        send,
      } as unknown as Response;

      await getLendersRecommendations(mockRequest, mockResponse);
			expect(status).toHaveBeenCalledWith(500);
    })
  })
})