/*
  Warnings:

  - Made the column `countryId` on table `Constant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Constant" DROP CONSTRAINT "Constant_countryId_fkey";

-- AlterTable
ALTER TABLE "Constant" ALTER COLUMN "countryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Constant" ADD CONSTRAINT "Constant_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
