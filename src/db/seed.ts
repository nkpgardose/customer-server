import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { customers, insertCustomerSchema } from './schema';

async function seed() {
  const db = drizzle({
    connection: {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!
    }
  });

	const customer = insertCustomerSchema.parse({
		first_name: 'Neil',
		last_name: 'Gardose',
		email: 'sample@email.com',
		employment_status: 'Employed',
		employer_name: 'Sample Employer'
	})

	await db.insert(customers).values(customer);
	console.log('New customer created!');
}

seed();
