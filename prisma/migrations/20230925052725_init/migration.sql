-- CreateTable
CREATE TABLE `GetSeries` (
    `id` VARCHAR(191) NOT NULL,
    `messageId` VARCHAR(191) NOT NULL,
    `per_page` INTEGER NOT NULL,
    `page` INTEGER NOT NULL,
    `search` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
