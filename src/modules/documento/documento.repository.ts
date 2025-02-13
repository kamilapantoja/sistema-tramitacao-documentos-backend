import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Documento, Prisma, SequenciaDocumento, TipoDocumento } from "@prisma/client";
@Injectable()
export class DocumentoRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.documento.findMany();
  }

  async criaTipoDocumento(data: Prisma.TipoDocumentoCreateInput): Promise<TipoDocumento> {
    return await this.prisma.tipoDocumento.create({
      data,
    });
  }

  async criaDocumento(data: Prisma.DocumentoCreateInput): Promise<Documento> {
    return await this.prisma.documento.create({
      data,
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
