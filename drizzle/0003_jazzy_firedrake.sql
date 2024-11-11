CREATE TABLE `fees` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`loan_offer_id` integer NOT NULL,
	`amount` numeric NOT NULL,
	`category` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`loan_offer_id`) REFERENCES `loan_offers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `lenders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `loan_offers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lender_id` integer NOT NULL,
	`repayment_value` numeric NOT NULL,
	`repayment_frequency` text NOT NULL,
	`interest_rate` numeric NOT NULL,
	`interest_frequency` text NOT NULL,
	`active` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`lender_id`) REFERENCES `lenders`(`id`) ON UPDATE no action ON DELETE no action
);
