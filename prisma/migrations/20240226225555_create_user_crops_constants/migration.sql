-- CreateEnum
CREATE TYPE "ConstantTypes" AS ENUM ('HARVEST_INDEX', 'AERIAL_RESIDUE_INDEX', 'PRODUCT_RESIDUE_INDEX', 'PRODUCT_DRY_MATTER_FACTOR', 'RESIDUE_DRY_MATTER_FACTOR', 'BELOWGROUND_INDEX', 'WEED_AERIAL_FACTOR', 'WEED_BELOWGROUND_INDEX');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constant" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "reference" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "type" "ConstantTypes" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cropsId" TEXT,

    CONSTRAINT "Constant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Constant" ADD CONSTRAINT "Constant_cropsId_fkey" FOREIGN KEY ("cropsId") REFERENCES "Crops"("id") ON DELETE SET NULL ON UPDATE CASCADE;
