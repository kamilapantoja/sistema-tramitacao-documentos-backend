/*
  Warnings:

  - Added the required column `enviadoPor` to the `TramitacaoDocumento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TramitacaoDocumento" ADD COLUMN     "enviadoPor" VARCHAR(100) NOT NULL;
