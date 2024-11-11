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

export const lenders = sqliteTable("lenders", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  created_at: int('created_at', { mode: 'timestamp' })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
  updated_at: int('updated_at', { mode: 'timestamp' })
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdate(() => new Date()),
});

// Schema for inserting a lenders - can be used to validate API requests.
export const insertLendersSchema = createInsertSchema(lenders);

export const loanOffers = sqliteTable("loan_offers", {
	id: int().primaryKey({ autoIncrement: true }),
	lender_id: int().references(() => lenders.id).notNull(),
	repayment_value: numeric().notNull(),
	repayment_frequency: text().notNull(),
	interest_rate: numeric().notNull(),
	interest_frequency: text().notNull(),
	active: int().notNull(), // SQLite does not have a boolean type, using int instead
	created_at: int('created_at', { mode: 'timestamp' })
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
	updated_at: int('updated_at', { mode: 'timestamp' })
		.default(sql`(strftime('%s', 'now'))`)
		.$onUpdate(() => new Date()),
});

// Schema for inserting a loan offer - can be used to validate API requests.
export const insertLoanOffersSchema = createInsertSchema(loanOffers);

export const fees = sqliteTable("fees", {
  id: int().primaryKey({ autoIncrement: true }),
  loan_offer_id: int().references(() => loanOffers.id).notNull(),
  amount: numeric().notNull(),
  category: text().notNull(),
  created_at: int('created_at', { mode: 'timestamp' })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
  updated_at: int('updated_at', { mode: 'timestamp' })
    .default(sql`(strftime('%s', 'now'))`)
    .$onUpdate(() => new Date()),
});

// Schema for inserting a fee - can be used to validate API requests.
export const insertFeesSchema = createInsertSchema(fees);

