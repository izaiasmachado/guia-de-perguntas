/*
  Warnings:

  - You are about to drop the column `authorId` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_authorId_fkey`;

-- AlterTable
ALTER TABLE `Notifications` DROP COLUMN `authorId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
