/*
  Warnings:

  - You are about to alter the column `rating` on the `user_film` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - Added the required column `review_content` to the `user_film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_titel` to the `user_film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_film` ADD COLUMN `review_content` VARCHAR(255) NOT NULL,
    ADD COLUMN `review_titel` VARCHAR(255) NOT NULL,
    MODIFY `rating` INTEGER UNSIGNED NULL;
