import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class EnviaDocumentoDTO {
  @ApiProperty({ description: "Id do Documento", type: Number, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: "Id do setor que envia o documento", type: Number, example: 101 })
  @IsNumber()
  @IsNotEmpty()
  idSetorEnvio: number;

  @ApiProperty({ description: "Id do setor que receberá o documento", type: Number, example: 202 })
  @IsNumber()
  @IsNotEmpty()
  idSetorRecebimento: number;
}
