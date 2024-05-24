/*
  Warnings:

  - Added the required column `climate` to the `Crop` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Climates" AS ENUM ('TropicalRainforest', 'Tropical', 'Subtropical', 'Desert', 'Temperate', 'Mediterranean', 'SemiArid', 'Subpolar', 'MountainCold', 'Polar');

-- AlterTable
ALTER TABLE "Crop" ADD COLUMN     "climate" "Climates" NOT NULL;
