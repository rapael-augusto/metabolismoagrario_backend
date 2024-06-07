-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('Pending', 'Approved', 'Declined');

-- CreateEnum
CREATE TYPE "IrrigationTypes" AS ENUM ('Irrigation', 'Dry');

-- CreateEnum
CREATE TYPE "CultivationSystem" AS ENUM ('Conventional', 'Organic', 'Agroecological');

-- CreateEnum
CREATE TYPE "Climates" AS ENUM ('TropicalRainforest', 'Tropical', 'Subtropical', 'Desert', 'Temperate', 'Mediterranean', 'SemiArid', 'Subpolar', 'MountainCold', 'Polar');

-- CreateEnum
CREATE TYPE "ConstantTypes" AS ENUM ('HARVEST_INDEX', 'AERIAL_RESIDUE_INDEX', 'PRODUCT_RESIDUE_INDEX', 'PRODUCT_DRY_MATTER_FACTOR', 'RESIDUE_DRY_MATTER_FACTOR', 'BELOWGROUND_INDEX', 'WEED_AERIAL_FACTOR', 'WEED_BELOWGROUND_INDEX');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRoles" NOT NULL,
    "refreshToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cultivar" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cropId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cultivar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constant" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "reference" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "type" "ConstantTypes" NOT NULL,
    "climate" "Climates" NOT NULL,
    "biome" TEXT NOT NULL,
    "irrigation" "IrrigationTypes" NOT NULL,
    "country" TEXT NOT NULL,
    "cultivationSystem" "CultivationSystem" NOT NULL,
    "cultivarId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Constant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Cultivar" ADD CONSTRAINT "Cultivar_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constant" ADD CONSTRAINT "Constant_cultivarId_fkey" FOREIGN KEY ("cultivarId") REFERENCES "Cultivar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
