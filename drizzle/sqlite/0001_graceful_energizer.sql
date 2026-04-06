CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`product_name` text NOT NULL,
	`size` text,
	`quantity` integer DEFAULT 1 NOT NULL,
	`price_cents` integer NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`naam` text NOT NULL,
	`email` text NOT NULL,
	`telefoon` text,
	`straat` text NOT NULL,
	`postcode` text NOT NULL,
	`stad` text NOT NULL,
	`opmerking` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
DROP TABLE `preorders`;--> statement-breakpoint
DROP TABLE `products`;