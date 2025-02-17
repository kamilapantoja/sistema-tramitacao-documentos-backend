import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { DocumentoService } from "./documento.service";
import { CreateTipoDocumentoDTO } from "./dtos/create-tipo-documento.dto";
import { CreateDocumentoDTO } from "./dtos/create-documento.dto";
import { EnviaDocumentoDTO } from "./dtos/envia-documento.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream, unlink, write, writeFile } from "fs";
import { randomUUID } from "crypto";
import { RecebeDocumentoDTO } from "./dtos/recebe-documento.dto";

@Controller("documento")
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Get()
  async findAll() {
    return this.documentoService.findAll();
  }

  @Get("lista-tipo")
  async buscaListaTipoDocumento() {
    return await this.documentoService.buscaListaTipoDocumento();
  }

  @Post()
  async createDocumento(@Body() createDocumentoDTO: CreateDocumentoDTO) {
    return this.documentoService.criaDocumento(createDocumentoDTO);
  }

  @Post("tipo")
  async createTipoDocumento(@Body() createTipoDocumentoDTO: CreateTipoDocumentoDTO) {
    return this.documentoService.createTipoDocumento(createTipoDocumentoDTO);
  }

  @Post("enviar")
  async enviaDocumento(@Body() enviaDocumentoDTO: EnviaDocumentoDTO) {
    return this.documentoService.enviaDocumento(enviaDocumentoDTO);
  }

  @Patch("receber")
  async receberDocumento(@Body() recebeDocumentoDTO: RecebeDocumentoDTO) {
    return this.documentoService.recebeDocumento(recebeDocumentoDTO);
  }

  @Put("file")
  @UseInterceptors(FileInterceptor("file"))
  async uploadArquivo(@UploadedFile() file: Express.Multer.File) {
    const salt = randomUUID();
    const filename = `${salt}-${file.originalname}`;
    await new Promise<void>((resolve) => {
      writeFile(`${process.env.UPLOAD_FOLDER}${filename}`, file.buffer, () => {
        resolve();
      });
    });
    return {
      filename,
    };
  }

  @Get("file/:path")
  async getFile(@Param("path") path: string) {
    const file = createReadStream(`${process.env.UPLOAD_FOLDER}${path}`);
    return new StreamableFile(file);
  }

  @Get(":numero")
  async getDocumentoByNumero(@Param("numero") numero: string) {
    return await this.documentoService.consultaDocumentoByNumero(numero);
  }

  @Put(":id")
  async atualizaDocumento(@Param("id") id: number, @Body() body: CreateDocumentoDTO) {
    return await this.documentoService.atualizaDocumento(id, body);
  }

  @Delete(":id")
  async deletaDocumento(@Param("id") id: number) {
    const documento = await this.documentoService.deletaDocumento(id);
    this.documentoService.deletaArquivoDocumento(documento.pathArquivoPDF);
    return documento;
  }
}
