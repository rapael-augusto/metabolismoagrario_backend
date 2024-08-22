/*
  Warnings:

  - You are about to drop the column `authorName` on the `BibliographicReference` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `BibliographicReference` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `BibliographicReference` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Constant` table. All the data in the column will be lost.
  - Added the required column `link` to the `BibliographicReference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BibliographicReference" DROP COLUMN "authorName",
DROP COLUMN "title",
DROP COLUMN "year",
ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Constant" DROP COLUMN "country",
ADD COLUMN     "countryId" TEXT;

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "gentilico" TEXT NOT NULL,
    "nome_pais" TEXT NOT NULL,
    "nome_pais_int" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Constant" ADD CONSTRAINT "Constant_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
