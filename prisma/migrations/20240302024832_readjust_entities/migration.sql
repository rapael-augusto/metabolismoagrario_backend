/*
  Warnings:

  - You are about to drop the column `cropsId` on the `Constant` table. All the data in the column will be lost.
  - You are about to drop the `Crops` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Constant" DROP CONSTRAINT "Constant_cropsId_fkey";

-- AlterTable
ALTER TABLE "Constant" DROP COLUMN "cropsId",
ADD COLUMN     "cropId" TEXT;

-- DropTable
DROP TABLE "Crops";

-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Constant" ADD CONSTRAINT "Constant_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
