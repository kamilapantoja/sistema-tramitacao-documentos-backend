import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DocumentoService } from "./documento.service";
import { CreateTipoDocumentoDTO } from "./dtos/create-tipo-documento.dto";
import { CreateDocumentoDTO } from "./dtos/create-documento.dto";
import { EnviaDocumentoDTO } from "./dtos/envia-documento.dto";

@Controller("documento")
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Get()
  async findAll() {
    return this.documentoService.findAll();
  }

  @Get(':numero')
  async getDocumentoByNumero(@Param('numero') numero: string) {
    return await this.documentoService.consultaDocumentoByNumero(numero);
  }

  @Post()
  async createDocumento(@Body() createDocumentoDTO: CreateDocumentoDTO) {
    return this.documentoService.criaDocumento(createDocumentoDTO);
  }

  @Post("tipo")
  async createTipoDocumento(@Body() createTipoDocumentoDTO: CreateTipoDocumentoDTO) {
    return this.documentoService.createTipoDocumento(createTipoDocumentoDTO);
  }

  @Post("envia")
  async enviaDocumento(@Body() enviaDocumentoDTO: EnviaDocumentoDTO) {
    return this.documentoService.enviaDocumento(enviaDocumentoDTO);
  }

}
