/*
  Warnings:

  - You are about to alter the column `priceTl` on the `Series` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `priceEd` on the `Series` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `pricePr` on the `Series` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Series` MODIFY `priceTl` INTEGER NOT NULL,
    MODIFY `priceEd` INTEGER NOT NULL,
    MODIFY `pricePr` INTEGER NOT NULL;
