import { Module } from "@nestjs/common";
import { DocumentoService } from "./documento.service";
import { DocumentoController } from "./documento.controller";
import { DocumentoRepository } from "./documento.repository";
import { PrismaService } from "src/prisma.service";

@Module({
  providers: [DocumentoService, DocumentoRepository, PrismaService],
  controllers: [DocumentoController],
})
export class DocumentoModule {}
