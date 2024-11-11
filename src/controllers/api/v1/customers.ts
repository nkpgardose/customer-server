import { Request, Response, } from "express-serve-static-core";
import { customers, insertCustomerSchema } from '../../../db/schema'
import { database } from "../../../db";
import { z } from 'zod';

type InsertCustomerInput = z.infer<typeof insertCustomerSchema>;

/**
 * POST /api/v1/customers
 */
export async function postCustomers(req: Request<{}, {}, InsertCustomerInput>, res: Response): Promise<void> {
  const {
    first_name,
    last_name,
    email,
    employer_name,
    employment_status
  } = req.body;

  const customerResult = insertCustomerSchema.safeParse({
    first_name,
    last_name,
    email,
    employer_name,
    employment_status
  });

  if (!customerResult.success) {
    res.status(400).send({
      errors: {
        network: {
          message: 'Invalid customer input'
        }
      }
    });

    return
  }

  try {
    const dbPayload = await database
      .insert(customers)
      .values(customerResult.data)
      .returning();

    res.status(200).send(dbPayload[0]);
  } catch (error) {
    console.error('Error inserting customer:', error);
    res.status(500).send({
      errors: {
        network: {
          message: 'Internal server error'
        }
      }
    });
  }
}
