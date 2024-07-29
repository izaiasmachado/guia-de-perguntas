/*
  Warnings:

  - You are about to drop the column `isBest` on the `Answer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bestAnswerId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Answer` DROP COLUMN `isBest`;

-- AlterTable
ALTER TABLE `Question` ADD COLUMN `bestAnswerId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Question_bestAnswerId_key` ON `Question`(`bestAnswerId`);

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_bestAnswerId_fkey` FOREIGN KEY (`bestAnswerId`) REFERENCES `Answer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
