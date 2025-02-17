import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.tipoDocumento.createMany({
    data: [
      {
        descTipoDocumento: "Contrato",
      },
      {
        descTipoDocumento: "Certidão",
      },
      {
        descTipoDocumento: "Recibo",
      },
      {
        descTipoDocumento: "Certificado",
      },
      {
        descTipoDocumento: "Comprovante",
      },
      {
        descTipoDocumento: "Atestado",
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
