import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.tipoDocumento.createMany({
    data: [
      {
        id: 1,
        descTipoDocumento: "Contrato",
      },
      {
        id: 2,
        descTipoDocumento: "Certidão",
      },
      {
        id: 3,
        descTipoDocumento: "Recibo",
      },
      {
        id: 4,
        descTipoDocumento: "Certificado",
      },
      {
        id: 5,
        descTipoDocumento: "Comprovante",
      },
      {
        id: 6,
        descTipoDocumento: "Atestado",
      },
    ],
  });
  await prisma.setor.createMany({
    data: [
      {
        id: 1,
        sigla: "TI",
        descSetor: "Tecnologia"
      },
      {
        id: 2,
        sigla: "COMP",
        descSetor: "Compras"
      },
      {
        id: 3,
        sigla: "RH",
        descSetor: "Recursos Humanos"
      },
      {
        id: 4,
        sigla: "FIN",
        descSetor: "Financeiro"
      },
    ],
  });
  await prisma.documento.createMany({
    data: [
      {
        id: 1,
       nroDocumento: "20250216-7-0002",
       titulo: "Contrato 1",
       descDocumento: "Contrato de prestacao de servico",
       dataDocumento: new Date("2025-02-17T01:13:49.727Z"),
       pathArquivoPDF: "2cb5a6ee-f242-46c0-b46c-827debdbae1a-Desafio Solasstec.pdf",
       tipoDocumentoId: 1,
      },
      {
       id: 2,
       nroDocumento: "20250216-7-0003",
       titulo: "Certidao",
       descDocumento: "Documento Certidao",
       dataDocumento: new Date("2025-02-17T01:13:49.727Z"),
       pathArquivoPDF: "2cb5a6ee-f242-46c0-b46c-827debdbae1a-Desafio Solasstec.pdf",
       tipoDocumentoId: 2,
      },
    ],
  });
  await prisma.tramitacaoDocumento.createMany({
    data: [
      {
        id: 1,
        documentoId: 2,
        setorEnvioId: 1,
        dataHoraEnvio: new Date("2025-02-17T01:13:49.727Z"),
        setorRecebeId: 2,
        dataHoraRecebido: null,
        enviadoPor: "Joao da Silva",
        enviado: true,
        recebido: false,
      },
    ],
  });
  console.log("Database seeded");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
