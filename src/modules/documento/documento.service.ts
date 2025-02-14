import { Injectable, NotFoundException } from "@nestjs/common";
import { DocumentoRepository } from "./documento.repository";
import { CreateTipoDocumentoDTO } from "./dtos/create-tipo-documento.dto";
import { Prisma } from "@prisma/client";
import { CreateDocumentoDTO } from "./dtos/create-documento.dto";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class DocumentoService {
  constructor(private repository: DocumentoRepository) {}

  async findAll() {
    return await this.repository.findAll();
  }

  async createTipoDocumento(data: CreateTipoDocumentoDTO) {
    const tipoDocumentoData: Prisma.TipoDocumentoCreateInput = {
      descTipoDocumento: data.tipo,
    };

    return this.repository.criaTipoDocumento(tipoDocumentoData);
  }

  async consultaDocumentoByNumero(numero: string) {
    const numeroDocumento: Prisma.DocumentoWhereInput = {
      nroDocumento: numero,
    };

    const documento = await this.repository.consultaDocumentoByNumero(numeroDocumento);

    if (!documento) throw new NotFoundException("Documento não encontrado");
    
    return documento;
  }

  async criaDocumento(data: CreateDocumentoDTO) {
    const hoje = new Date();
    const dataFormatada = `${hoje.getFullYear()}${(hoje.getMonth() + 1).toString().padStart(2, "0")}${hoje.getDate().toString().padStart(2, "0")}`;

    let sequencia = await this.repository.findSequencia(new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()));

    let proximoNumero = 1;

    if (!sequencia) {
      sequencia = await this.repository.criaSequencia();
    } else {
      proximoNumero = sequencia.proximoNumero;
      await this.repository.atualizaSequencia(sequencia.id, proximoNumero + 1);
    }

    const numeroSequencial = proximoNumero.toString().padStart(4, "0");
    const nroDocumento = `${dataFormatada}-${data.tipo}-${numeroSequencial}`;

    const documentoData: Prisma.DocumentoCreateInput = {
      nroDocumento,
      tipoDocumento: {
        connect: { id: data.tipo },
      },
      titulo: data.titulo,
      descDocumento: data.descricao,
      pathArquivoPDF: data.arquivoPdf,
      dataDocumento: new Date(),
    };

    return this.repository.criaDocumento(documentoData);
  }
}
