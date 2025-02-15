/*
  Warnings:

  - You are about to drop the column `enviado` on the `Documento` table. All the data in the column will be lost.
  - You are about to drop the column `recebido` on the `Documento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "enviado",
DROP COLUMN "recebido";

-- AlterTable
ALTER TABLE "TramitacaoDocumento" ADD COLUMN     "enviado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recebido" BOOLEAN NOT NULL DEFAULT false;
