import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class RecebeDocumentoDTO {
  @ApiProperty({ description: "Id do Documento", type: Number, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
