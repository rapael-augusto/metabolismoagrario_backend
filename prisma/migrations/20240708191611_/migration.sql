-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('Pending', 'Approved', 'Declined');

-- CreateEnum
CREATE TYPE "IrrigationTypes" AS ENUM ('Irrigation', 'Dry');

-- CreateEnum
CREATE TYPE "CultivationSystem" AS ENUM ('Conventional', 'Organic', 'Agroecological');

-- CreateEnum
CREATE TYPE "SoilTypes" AS ENUM ('Clayey', 'Sandy', 'SandyClay');

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BibliographicReference" (
    "id" SERIAL NOT NULL,
    "authorName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "BibliographicReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constant" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "reference" TEXT NOT NULL,
    "type" "ConstantTypes" NOT NULL,
    "comment" TEXT,
    "climate" TEXT,
    "biome" TEXT,
    "irrigation" "IrrigationTypes",
    "country" TEXT,
    "soil" "SoilTypes",
    "cultivationSystem" "CultivationSystem",
    "cultivarId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bibliographicReferenceId" INTEGER,

    CONSTRAINT "Constant_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Constant" ADD CONSTRAINT "Constant_cultivarId_fkey" FOREIGN KEY ("cultivarId") REFERENCES "Cultivar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constant" ADD CONSTRAINT "Constant_bibliographicReferenceId_fkey" FOREIGN KEY ("bibliographicReferenceId") REFERENCES "BibliographicReference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cultivar" ADD CONSTRAINT "Cultivar_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
