import { sql } from 'drizzle-orm';
import { sqliteTable, text, int, numeric } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';

export const customers = sqliteTable("customers", {
	id: int().primaryKey({ autoIncrement: true }),
	first_name: text().notNull(),
	last_name: text().notNull(),
	email: text().notNull(),
	employment_status: text().notNull(),
	employer_name: text(),
	created_at: int('created_at', { mode: 'timestamp' })
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
	updated_at: int('updated_at', { mode: 'timestamp' })
		.default(sql`(strftime('%s', 'now'))`)
		.$onUpdate(() => new Date()),
});

// Schema for inserting a customer - can be used to validate API requests.
export const insertCustomerSchema = createInsertSchema(customers);

export const loanDetails = sqliteTable("loan_details", {
	id: int().primaryKey({ autoIncrement: true }),
	customer_id: int().references(() => customers.id).notNull(),
	price: int().notNull(),
	deposit: int().notNull(),
	loan_purpose: text().notNull(),
	loan_term: int().notNull(),
	created_at: int('created_at', { mode: 'timestamp' })
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
	updated_at: int('updated_at', { mode: 'timestamp' })
		.default(sql`(strftime('%s', 'now'))`)
		.$onUpdate(() => new Date()),
});

// Schema for inserting a loan details - can be used to validate API requests.
export const insertLoanDetailsSchema = createInsertSchema(loanDetails);

