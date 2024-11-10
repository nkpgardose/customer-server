import 'dotenv/config';
import { customers, insertCustomerSchema } from './schema';
import { database } from '.';

async function seed() {
	const customer = insertCustomerSchema.parse({
		first_name: 'Neil',
		last_name: 'Gardose',
		email: 'sample@email.com',
		employment_status: 'Employed',
		employer_name: 'Sample Employer'
	})

	await database.insert(customers).values(customer);
	console.log('New customer created!');
}

seed();
