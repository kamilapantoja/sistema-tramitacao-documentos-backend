import { Body, Controller, Get, Post } from "@nestjs/common";
import { DocumentoService } from "./documento.service";
import { CreateTipoDocumentoDTO } from "./dtos/create-tipo-documento.dto";
import { CreateDocumentoDTO } from "./dtos/create-documento.dto";

@Controller("documento")
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Get()
  async findAll() {
    return this.documentoService.findAll();
  }

  @Post()
  async createDocumento(@Body() createDocumentoDTO: CreateDocumentoDTO) {
    return this.documentoService.criaDocumento(createDocumentoDTO);
  }

  @Post("tipo")
  async createTipoDocumento(@Body() createTipoDocumentoDTO: CreateTipoDocumentoDTO) {
    return this.documentoService.createTipoDocumento(createTipoDocumentoDTO);
  }

}
