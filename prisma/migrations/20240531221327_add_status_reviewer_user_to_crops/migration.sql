/*
  Warnings:

  - Made the column `cropId` on table `Constant` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status` to the `Crop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Crop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('Pending', 'Approved', 'Declined');

-- DropForeignKey
ALTER TABLE "Constant" DROP CONSTRAINT "Constant_cropId_fkey";

-- AlterTable
ALTER TABLE "Constant" ALTER COLUMN "cropId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Crop" ADD COLUMN     "reviewerId" TEXT,
ADD COLUMN     "status" "ReviewStatus" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constant" ADD CONSTRAINT "Constant_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
