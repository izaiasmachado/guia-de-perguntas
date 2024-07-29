/*
  Warnings:

  - You are about to drop the column `bestAnswerId` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Answer` ADD COLUMN `isBest` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `bestAnswerId`;
