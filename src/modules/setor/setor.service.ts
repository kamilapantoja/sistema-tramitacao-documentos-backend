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
      descSetor: data.descSetor,
    };

    return this.repository.create(setorData);
  }

  async update(id: number, data: CreateSetorDTO) {
    const setorData: Prisma.SetorUpdateInput = {
      sigla: data.sigla,
      descSetor: data.descSetor,
    };

    return this.repository.update(id, setorData);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
