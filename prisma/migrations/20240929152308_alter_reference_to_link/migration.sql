/*
  Warnings:

  - You are about to drop the column `bibliographicReferenceId` on the `Constant` table. All the data in the column will be lost.
  - You are about to drop the `BibliographicReference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Constant" DROP CONSTRAINT "Constant_bibliographicReferenceId_fkey";

-- AlterTable
ALTER TABLE "Constant" DROP COLUMN "bibliographicReferenceId",
ADD COLUMN     "linkReferece" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "BibliographicReference";
