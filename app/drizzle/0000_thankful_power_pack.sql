CREATE TABLE `experiments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`bounty` integer NOT NULL,
	`creator_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`verifier_address` text NOT NULL,
	`image` blob NOT NULL,
	`tx_hash` text NOT NULL,
	`contract_id` text NOT NULL,
	`revalidated_at` integer,
	`revalidated_by` text,
	`claimed_at` integer,
	FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `experiments_creator_id_idx` ON `experiments` (`creator_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`address` text,
	`name` text,
	`world_id_nullifier_hash` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_address_unique` ON `users` (`address`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_world_id_nullifier_hash_unique` ON `users` (`world_id_nullifier_hash`);