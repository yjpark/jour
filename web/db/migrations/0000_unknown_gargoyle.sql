CREATE TABLE `entries` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`jour_id` int NOT NULL,
	`user_id` int NOT NULL,
	`head_id` int,
	`text` text,
	`data` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `heads` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`slug` varchar(256) NOT NULL,
	`jour_id` int NOT NULL,
	`entry_id` int NOT NULL,
	`data` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `heads_id` PRIMARY KEY(`id`),
	CONSTRAINT `slug_idx` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `jour_users` (
	`jour_id` int NOT NULL,
	`user_id` int NOT NULL,
	`role` enum('Owner','Admin','Editor','Reader'),
	`data` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jour_users_jour_id_user_id_pk` PRIMARY KEY(`jour_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `jours` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`data` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jours_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `links` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`from_id` int NOT NULL,
	`to_id` int NOT NULL,
	`kind` enum('Weak','Link','Shadow'),
	`data` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(128) NOT NULL,
	`name` varchar(64) NOT NULL,
	`avatar` varchar(256) NOT NULL,
	`data` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `jour_idx` ON `entries` (`jour_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `entries` (`user_id`);--> statement-breakpoint
CREATE INDEX `head_idx` ON `entries` (`head_id`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `entries` (`created_at`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `entries` (`updated_at`);--> statement-breakpoint
CREATE INDEX `jour_idx` ON `heads` (`jour_id`);--> statement-breakpoint
CREATE INDEX `entry_idx` ON `heads` (`entry_id`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `heads` (`created_at`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `heads` (`updated_at`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `jour_users` (`created_at`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `jour_users` (`updated_at`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `jours` (`name`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `jours` (`created_at`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `jours` (`updated_at`);--> statement-breakpoint
CREATE INDEX `from_idx` ON `links` (`from_id`);--> statement-breakpoint
CREATE INDEX `to_idx` ON `links` (`to_id`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `links` (`created_at`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `links` (`updated_at`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `users` (`name`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `users` (`created_at`);--> statement-breakpoint
CREATE INDEX `updated_at_idx` ON `users` (`updated_at`);