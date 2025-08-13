-- CreateTable
CREATE TABLE `Screening` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `film_id` INTEGER UNSIGNED NOT NULL,
    `naam` VARCHAR(255) NOT NULL,
    `huisnummer` TINYINT UNSIGNED NOT NULL,
    `postcode` INTEGER UNSIGNED NOT NULL,
    `straat` VARCHAR(255) NOT NULL,
    `datetime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `idx_name_unique`(`naam`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `films` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `titel` VARCHAR(255) NOT NULL,
    `regiseur` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_film` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `film_id` INTEGER UNSIGNED NOT NULL,
    `rating` INTEGER NULL,

    UNIQUE INDEX `user_film_user_id_film_id_key`(`user_id`, `film_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `idx_user_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Screening` ADD CONSTRAINT `fk_screening_film` FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_film` ADD CONSTRAINT `fk_userfilm_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_film` ADD CONSTRAINT `fk_userfilm_film` FOREIGN KEY (`film_id`) REFERENCES `films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
