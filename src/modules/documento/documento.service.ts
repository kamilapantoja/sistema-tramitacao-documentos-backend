import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DocumentoRepository } from "./documento.repository";
import { CreateTipoDocumentoDTO } from "./dtos/create-tipo-documento.dto";
import { Documento, Prisma } from "@prisma/client";
import { CreateDocumentoDTO } from "./dtos/create-documento.dto";
import { v4 as uuidv4 } from "uuid";
import { EnviaDocumentoDTO } from "./dtos/envia-documento.dto";
import { unlink } from "fs";
import { RecebeDocumentoDTO } from "./dtos/recebe-documento.dto";

@Injectable()
export class DocumentoService {
  constructor(private repository: DocumentoRepository) {}

  async findAll() {
    return (await this.repository.findAll()).map((d) => {
      return { ...d, prettyName: this.prettyNameFromPath(d.pathArquivoPDF) };
    });
  }

  prettyNameFromPath(path: string) {
    return path.substring(37);
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

  async buscaTipoDocumento(id: number) {
    return await this.repository.buscaTipoDocumento(id);
  }

  async buscaListaTipoDocumento() {
    return await this.repository.buscaListaTipoDocumento();
  }

  async enviaDocumento(data: EnviaDocumentoDTO) {
    const documentoExiste = await this.repository.verificaExistenciaDocumento(data.id);

    if (!documentoExiste) {
      throw new NotFoundException("Documento não encontrado");
    }

    const tramiteDocumento: Prisma.TramitacaoDocumentoCreateInput = {
      enviadoPor: "João",
      setorEnvia: {
        connect: { id: data.idSetorEnvio },
      },
      setorRecebe: {
        connect: { id: data.idSetorRecebimento },
      },
      documento: {
        connect: { id: data.id },
      },

      enviado: true,
      dataHoraEnvio: new Date(),
    };

    return this.repository.enviaDocumento(tramiteDocumento);
  }

  async recebeDocumento(data: RecebeDocumentoDTO) {
    const tramitacaoExiste = await this.repository.verificaExistenciaTramitacao(data.id);
    if (!tramitacaoExiste) {
      throw new NotFoundException("Documento não encontrado");
    }

    const updateData: Prisma.TramitacaoDocumentoUpdateInput = {
      recebido: true,
      dataHoraRecebido: new Date(),
    };

    return this.repository.recebeDocumento(data.id, updateData);
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

  async deletaArquivoDocumento(path: string) {
    const filename = `${process.env.UPLOAD_FOLDER}${path}`;
    await new Promise<void>((resolve) => {
      unlink(filename, (err) => {
        if (err) {
          throw err;
        }
        resolve();
      });
    });
  }

  async atualizaDocumento(id: number, data: CreateDocumentoDTO): Promise<Documento> {
    const documentoExistente = await this.repository.buscaDocumentoComTramite(id);

    if (!documentoExistente) {
      throw new NotFoundException(`Documento com ID ${id} não encontrado.`);
    }

    if (documentoExistente.tramitacoes && documentoExistente.tramitacoes.length > 0) {
      throw new BadRequestException("Não é possível atualizar um documento que já está em Trâmite.");
    }
    await this.deletaArquivoDocumento(documentoExistente.pathArquivoPDF);
    const documentoData: Prisma.DocumentoUpdateInput = {
      tipoDocumento: {
        connect: { id: data.tipo },
      },
      titulo: data.titulo,
      descDocumento: data.descricao,
      pathArquivoPDF: data.arquivoPdf,
    };

    return await this.repository.atualizaDocumento(id, documentoData);
  }

  async deletaDocumento(id: number): Promise<Documento> {
    const documentoExistente = await this.repository.buscaDocumentoComTramite(id);

    if (!documentoExistente) {
      throw new NotFoundException(`Documento com ID ${id} não encontrado.`);
    }

    if (documentoExistente.tramitacoes && documentoExistente.tramitacoes.length > 0) {
      throw new BadRequestException("Não é possível deletar um documento que já está em Trâmite.");
    }

    return await this.repository.deletaDocumento(id);
  }
}
