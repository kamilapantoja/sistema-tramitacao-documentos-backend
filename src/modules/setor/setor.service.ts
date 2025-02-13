import { Injectable } from "@nestjs/common";
import { SetorRepository } from "./setor.repository";

@Injectable()
export class SetorService {
  constructor(private repository: SetorRepository) {}

  async findAll() {
    return await this.repository.findAll();
  }
}
