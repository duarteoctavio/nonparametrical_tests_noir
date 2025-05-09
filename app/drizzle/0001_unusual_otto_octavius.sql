PRAGMA defer_foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_experiments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`bounty` real NOT NULL,
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
INSERT INTO `__new_experiments`("id", "title", "description", "bounty", "creator_id", "created_at", "verifier_address", "image", "tx_hash", "contract_id", "revalidated_at", "revalidated_by", "claimed_at") SELECT "id", "title", "description", "bounty", "creator_id", "created_at", "verifier_address", "image", "tx_hash", "contract_id", "revalidated_at", "revalidated_by", "claimed_at" FROM `experiments`;--> statement-breakpoint
DROP TABLE `experiments`;--> statement-breakpoint
ALTER TABLE `__new_experiments` RENAME TO `experiments`;--> statement-breakpoint
PRAGMA defer_foreign_keys=OFF;--> statement-breakpoint
CREATE INDEX `experiments_creator_id_idx` ON `experiments` (`creator_id`);
