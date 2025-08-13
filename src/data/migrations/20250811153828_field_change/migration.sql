-- DropForeignKey
ALTER TABLE `user_film` DROP FOREIGN KEY `fk_userfilm_film`;

-- DropForeignKey
ALTER TABLE `user_film` DROP FOREIGN KEY `fk_userfilm_user`;

-- DropIndex
DROP INDEX `fk_userfilm_film` ON `user_film`;

-- AddForeignKey
ALTER TABLE `user_film` ADD CONSTRAINT `fk_userfilm_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_film` ADD CONSTRAINT `fk_userfilm_film` FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
