import { Module } from "@nestjs/common";
import { SetorService } from "./setor.service";
import { SetorController } from "./setor.controller";
import { SetorRepository } from "./setor.repository";
import { PrismaService } from "src/prisma.service";

@Module({
  providers: [SetorService, SetorRepository, PrismaService],
  controllers: [SetorController],
})
export class SetorModule {}
