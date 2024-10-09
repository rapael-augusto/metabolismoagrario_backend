/*
  Warnings:

  - You are about to drop the column `linkReferece` on the `Constant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Constant" DROP COLUMN "linkReferece",
ADD COLUMN     "linkReference" TEXT NOT NULL DEFAULT '';
