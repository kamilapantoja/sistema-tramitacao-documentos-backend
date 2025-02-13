import { Injectable } from "@nestjs/common";
import { SetorRepository } from "./setor.repository";
import { CreateSetorDTO } from "./dtos/create-setor.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class SetorService {
  constructor(private repository: SetorRepository) {}

  async findAll() {
    return await this.repository.findAll();
  }

  async create(data: CreateSetorDTO) {
    const setorData: Prisma.SetorCreateInput = {
      sigla: data.sigla,
      descSetor: data.descricao,
    };

    return this.repository.create(setorData);
  }
}
