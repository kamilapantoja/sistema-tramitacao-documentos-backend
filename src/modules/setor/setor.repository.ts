import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class SetorRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.setor.findMany();
  }
}
