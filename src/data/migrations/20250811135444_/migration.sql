/*
  Warnings:

  - You are about to drop the column `datetime` on the `screening` table. All the data in the column will be lost.
  - Added the required column `datum` to the `Screening` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idx_name_unique` ON `screening`;

-- AlterTable
ALTER TABLE `screening` DROP COLUMN `datetime`,
    ADD COLUMN `datum` DATETIME(0) NOT NULL;
