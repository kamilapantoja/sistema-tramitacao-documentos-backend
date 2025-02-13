import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoDocumentoDTO {
  @ApiProperty({ description: "Tipo do documento", type: String, example: "Tipo Documento 1" })
  @IsString()
  @IsNotEmpty()
  tipo: string;
}
