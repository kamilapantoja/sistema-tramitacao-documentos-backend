import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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

  @Put(":id")
  async update(@Param("id") id: number, @Body() createDTO: CreateSetorDTO) {
    return this.setorService.update(id, createDTO);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.setorService.delete(id);
  }
}
