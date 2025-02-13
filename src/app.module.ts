import { Module } from "@nestjs/common";
import { SetorModule } from "./modules/setor/setor.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      SetorModule,
   
    ],
  })
  export class AppModule {}
  
