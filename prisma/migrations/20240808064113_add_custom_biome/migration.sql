-- AlterTable
ALTER TABLE "Constant" ADD COLUMN     "customBiomeId" TEXT;

-- CreateTable
CREATE TABLE "CustomBiomeType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomBiomeType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomBiomeType_name_key" ON "CustomBiomeType"("name");

-- AddForeignKey
ALTER TABLE "Constant" ADD CONSTRAINT "Constant_customBiomeId_fkey" FOREIGN KEY ("customBiomeId") REFERENCES "CustomBiomeType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
