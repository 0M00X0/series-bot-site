/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Settings` DROP COLUMN `isDeleted`,
    ADD COLUMN `canDeleted` BOOLEAN NOT NULL DEFAULT false;
