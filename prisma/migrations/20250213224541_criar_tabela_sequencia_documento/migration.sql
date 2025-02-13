-- CreateTable
CREATE TABLE "SequenciaDocumento" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "proximoNumero" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "SequenciaDocumento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SequenciaDocumento_data_key" ON "SequenciaDocumento"("data");
