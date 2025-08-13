/*
  Warnings:

  - Made the column `rating` on table `user_film` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user_film` MODIFY `rating` INTEGER UNSIGNED NOT NULL;
