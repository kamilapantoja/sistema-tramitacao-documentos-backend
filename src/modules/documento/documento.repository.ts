import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Documento, Prisma, SequenciaDocumento, TipoDocumento, TramitacaoDocumento } from "@prisma/client";
@Injectable()
export class DocumentoRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.documento.findMany({
      select: {
        id: true,
        nroDocumento: true,
        titulo: true,
        pathArquivoPDF: true,
        tipoDocumento: true,
        descDocumento: true,
        tramitacoes: {
          select: {
            id: true,
            dataHoraEnvio: true,
            dataHoraRecebido: true,
            setorEnvia: {
              select: {
                id: true,
                sigla: true,
                descSetor: true,
              },
            },
            setorRecebe: {
              select: {
                id: true,
                sigla: true,
                descSetor: true,
              },
            },
          },
        },
      },
    });
  }

  async criaTipoDocumento(data: Prisma.TipoDocumentoCreateInput): Promise<TipoDocumento> {
    return await this.prisma.tipoDocumento.create({
      data,
    });
  }

  async verificaExistenciaDocumento(id: number) {
    const documento = await this.prisma.documento.findUnique({
      where: { id },
    });

    return documento;
  }

  async buscaDocumentoComTramite(id: number) {
    const documento = await this.prisma.documento.findUnique({
      where: { id },
      include: { tramitacoes: true },
    });

    return documento;
  }

  async buscaTipoDocumento(id: number) {
    const documento = await this.prisma.tipoDocumento.findUnique({
      where: { id },
    });

    return documento;
  }

  async buscaListaTipoDocumento() {
    return await this.prisma.tipoDocumento.findMany();
  }

  async enviaDocumento(data: Prisma.TramitacaoDocumentoCreateInput): Promise<TramitacaoDocumento> {
    return await this.prisma.tramitacaoDocumento.create({
      data,
    });
  }

  async recebeDocumento(id: number, data: Prisma.TramitacaoDocumentoUpdateInput): Promise<TramitacaoDocumento> {
    return await this.prisma.tramitacaoDocumento.update({
      where: {
        id,
      },
      data,
    });
  }

  async consultaDocumentoByNumero(numero: Prisma.DocumentoWhereInput) {
    return this.prisma.documento.findFirst({
      select: {
        id: true,
        nroDocumento: true,
        titulo: true,
        descDocumento: true,
        dataDocumento: true,
        tipoDocumento: {
          select: {
            id: true,
            descTipoDocumento: true,
          },
        },
      },
      where: numero,
    });
  }

  async verificaExistenciaTramitacao(id: number) {
    return await this.prisma.tramitacaoDocumento.findFirst({
      where: {
        id,
      },
    });
  }

  async criaDocumento(data: Prisma.DocumentoCreateInput): Promise<Documento> {
    return await this.prisma.documento.create({
      data,
    });
  }

  async atualizaDocumento(id: number, data: Prisma.DocumentoUpdateInput): Promise<Documento> {
    const document = await this.prisma.documento.update({
      where: {
        id,
      },
      data,
    });

    return document;
  }

  async deletaDocumento(id: number): Promise<Documento> {
    return await this.prisma.documento.delete({
      where: { id },
    });
  }

  async findSequencia(data: Date): Promise<SequenciaDocumento | null> {
    return await this.prisma.sequenciaDocumento.findUnique({
      where: { data },
    });
  }

  async criaSequencia(): Promise<SequenciaDocumento> {
    const hoje = new Date();
    const dataCorreta = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    return await this.prisma.sequenciaDocumento.create({
      data: {
        data: dataCorreta,
        proximoNumero: 2,
      },
    });
  }

  async atualizaSequencia(id: number, novoNumero: number): Promise<void> {
    await this.prisma.sequenciaDocumento.update({
      where: { id },
      data: { proximoNumero: novoNumero },
    });
  }
}
