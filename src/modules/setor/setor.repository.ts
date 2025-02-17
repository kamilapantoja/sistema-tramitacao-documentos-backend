import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma, Setor } from "@prisma/client";

@Injectable()
export class SetorRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.setor.findMany();
  }

  async create(data: Prisma.SetorCreateInput): Promise<Setor> {
    return this.prisma.setor.create({
      data,
    });
  }

  async update(id: number, data: Prisma.SetorUpdateInput): Promise<Setor> {
    return this.prisma.setor.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Setor> {
    return this.prisma.setor.delete({
      where: {
        id,
      },
    });
  }
}
