import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from "class-validator";

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

  @ApiProperty({ description: "Número do documento", type: String, example: "20250213-1-0001" })
  @IsString()
  @IsNotEmpty()
  numero: string;

  @ApiProperty({ description: "Título do documento", type: String, example: "Relatório Financeiro" })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: "Id do tipo de documento", type: Number, example: 5 })
  @IsNumber()
  @IsNotEmpty()
  tipo: number;

  @ApiProperty({ description: "Descrição do documento", type: String, example: "Relatório financeiro do 1º trimestre de 2025" })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  // @ApiProperty({ description: "Data de envio do documento", type: String, example: "2025-02-13T15:30:00Z" })
  // @IsString()
  // @IsNotEmpty()
  // dataEnvio: string;

  @ApiProperty({ description: "Nome da pessoa que enviou o documento", type: String, example: "Maria Silva" })
  @IsString()
  @IsNotEmpty()
  enviadoPor: string;

  @ApiProperty({ description: "Anexo do documento", type: String, example: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MK..." })
  @IsString()
  @IsNotEmpty()
  anexo: string;

  @ApiProperty({ description: "Flag indicando se o documento foi enviado", type: Boolean, example: false })
  @IsBoolean()
  enviado: boolean;

  @ApiProperty({ description: "Flag indicando se o documento foi recebido", type: Boolean, example: false })
  @IsBoolean()
  recebido: boolean;
}
