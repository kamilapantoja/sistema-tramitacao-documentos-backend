import { Module } from "@nestjs/common";
import { DocumentoService } from "./documento.service";
import { DocumentoController } from "./documento.controller";

@Module({
  providers: [DocumentoService],
  controllers: [DocumentoController],
})
export class DocumentoModule {}
