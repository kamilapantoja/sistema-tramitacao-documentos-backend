import { Body, Controller, Get, Post } from "@nestjs/common";
import { SetorService } from "./setor.service";
import { CreateSetorDTO } from "./dtos/create-setor.dto";

@Controller("setor")
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @Get()
  async findAll() {
    return this.setorService.findAll();
  }

  @Post()
  async create(@Body() createDTO: CreateSetorDTO) {
    return this.setorService.create(createDTO);
  }
}
