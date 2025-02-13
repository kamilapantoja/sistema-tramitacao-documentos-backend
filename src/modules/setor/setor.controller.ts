import { Controller, Get } from "@nestjs/common";
import { SetorService } from "./setor.service";

@Controller("setor")
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @Get()
  async findAll() {
    return this.setorService.findAll();
  }
}
