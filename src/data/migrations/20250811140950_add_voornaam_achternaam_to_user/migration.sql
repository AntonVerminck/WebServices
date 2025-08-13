/*
  Warnings:

  - You are about to drop the column `naam` on the `users` table. All the data in the column will be lost.
  - Added the required column `achternaam` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voornaam` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `naam`,
    ADD COLUMN `achternaam` VARCHAR(255) NOT NULL,
    ADD COLUMN `voornaam` VARCHAR(255) NOT NULL;
