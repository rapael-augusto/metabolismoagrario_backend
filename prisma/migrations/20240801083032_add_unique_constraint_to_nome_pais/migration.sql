/*
  Warnings:

  - A unique constraint covering the columns `[nome_pais]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Country_nome_pais_key" ON "Country"("nome_pais");
