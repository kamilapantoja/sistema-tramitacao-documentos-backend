import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSetorDTO {
    @ApiProperty({ description: "Sigla do Setor", type: String, example: "A" })
    @IsString()
    @IsNotEmpty()
    sigla: string;

    @ApiProperty({ description: "Descrição do Setor", type: String, example: "Setor A" })
    @IsString()
    @IsNotEmpty()
    descricao: string;
}