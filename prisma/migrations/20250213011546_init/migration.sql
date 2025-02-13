-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "sigla" VARCHAR(10) NOT NULL,
    "descSetor" VARCHAR(60) NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "nroDocumento" VARCHAR(10) NOT NULL,
    "titulo" VARCHAR(40) NOT NULL,
    "descDocumento" VARCHAR(255) NOT NULL,
    "dataDocumento" TIMESTAMP(3) NOT NULL,
    "pathArquivoPDF" VARCHAR(100) NOT NULL,
    "tipoDocumentoId" INTEGER NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDocumento" (
    "id" SERIAL NOT NULL,
    "descTipoDocumento" VARCHAR(30) NOT NULL,

    CONSTRAINT "TipoDocumento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TramitacaoDocumento" (
    "id" SERIAL NOT NULL,
    "documentoId" INTEGER NOT NULL,
    "setorEnvioId" INTEGER NOT NULL,
    "dataHoraEnvio" TIMESTAMP(3) NOT NULL,
    "setorRecebeId" INTEGER NOT NULL,
    "dataHoraRecebido" TIMESTAMP(3),

    CONSTRAINT "TramitacaoDocumento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_tipoDocumentoId_fkey" FOREIGN KEY ("tipoDocumentoId") REFERENCES "TipoDocumento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TramitacaoDocumento" ADD CONSTRAINT "TramitacaoDocumento_documentoId_fkey" FOREIGN KEY ("documentoId") REFERENCES "Documento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TramitacaoDocumento" ADD CONSTRAINT "TramitacaoDocumento_setorEnvioId_fkey" FOREIGN KEY ("setorEnvioId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TramitacaoDocumento" ADD CONSTRAINT "TramitacaoDocumento_setorRecebeId_fkey" FOREIGN KEY ("setorRecebeId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
