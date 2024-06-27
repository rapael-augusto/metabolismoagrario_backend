/*
  Warnings:

  - The `climate` column on the `Constant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SoilTypes" AS ENUM ('Clayey', 'Sandy', 'SandyClay');

-- AlterTable
ALTER TABLE "Constant" ADD COLUMN     "soil" "SoilTypes",
DROP COLUMN "climate",
ADD COLUMN     "climate" TEXT,
ALTER COLUMN "biome" DROP NOT NULL,
ALTER COLUMN "irrigation" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "cultivationSystem" DROP NOT NULL;

-- DropEnum
DROP TYPE "Climates";
