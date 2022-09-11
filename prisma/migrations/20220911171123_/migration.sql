/*
  Warnings:

  - You are about to alter the column `title` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `note` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "Notes" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "note" SET DATA TYPE VARCHAR(1000);
