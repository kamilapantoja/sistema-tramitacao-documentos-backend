import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDocumentoDTO {
  @ApiProperty({ description: "Id do tipo de documento", type: String, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  tipo: number;

  @ApiProperty({ description: "Título do documento", type: String, example: "Documento 1" })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: "Descrição do documento", type: String, example: "Descrição 1" })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ description: "Descrição do documento", type: String, example: "Descrição 1" })
  @IsString()
  @IsNotEmpty()
  arquivoPdf: string;
}
