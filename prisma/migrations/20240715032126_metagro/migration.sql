/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Constant" ADD COLUMN     "bibliographicReferenceId" INTEGER,
ALTER COLUMN "comment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "BibliographicReference" (
    "id" SERIAL NOT NULL,
    "authorName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "BibliographicReference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Constant" ADD CONSTRAINT "Constant_bibliographicReferenceId_fkey" FOREIGN KEY ("bibliographicReferenceId") REFERENCES "BibliographicReference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
