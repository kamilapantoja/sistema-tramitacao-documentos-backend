import { Module } from "@nestjs/common";
import { SetorModule } from "./modules/setor/setor.module";
import { ConfigModule } from "@nestjs/config";
import { DocumentoModule } from "./modules/documento/documento.module";

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      SetorModule,
      DocumentoModule,
    ],
  })
  export class AppModule {}
  
