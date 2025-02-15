-- AlterTable
ALTER TABLE "Documento" ADD COLUMN     "enviado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recebido" BOOLEAN NOT NULL DEFAULT false;
