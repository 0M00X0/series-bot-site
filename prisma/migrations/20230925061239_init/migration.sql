/*
  Warnings:

  - A unique constraint covering the columns `[messageId]` on the table `GetSeries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `GetSeries_messageId_key` ON `GetSeries`(`messageId`);
