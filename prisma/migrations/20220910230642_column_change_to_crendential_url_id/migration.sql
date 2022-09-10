/*
  Warnings:

  - You are about to drop the column `credentialUrl` on the `Credentials` table. All the data in the column will be lost.
  - Added the required column `credentialUrlId` to the `Credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Credentials" DROP CONSTRAINT "Credentials_credentialUrl_fkey";

-- AlterTable
ALTER TABLE "Credentials" DROP COLUMN "credentialUrl",
ADD COLUMN     "credentialUrlId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_credentialUrlId_fkey" FOREIGN KEY ("credentialUrlId") REFERENCES "Sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
