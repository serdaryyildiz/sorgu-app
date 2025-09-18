import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { HealthModule } from 'src/health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
  imports: 
    [
      ConfigModule.forRoot({
        isGlobal:true,
        envFilePath: [
          path.resolve(__dirname , "../../.env.dev.local"),
          path.resolve(__dirname , "../../.env.local"),
          path.resolve(__dirname , "../../.env"),

          path.resolve(process.cwd(), '../.env.dev.local'),
          path.resolve(process.cwd(), '../.env.local'),
          path.resolve(process.cwd(), '../.env'),

          
        ]
      }),

      TypeOrmModule.forRootAsync({
        inject:[ConfigService],
        useFactory: ( config : ConfigService) => ({
          type: "postgres",
          host:config.get<string>('HOST'),
          port:config.get<number>('DB_PORT'),
          username:config.get<string>('DB_USERNAME'),
          password:config.get<string>('DB_PASSWORD'),
          database:config.get<string>('DATABASE'),
          autoLoadEntities:true,
          synchronize:true
        })
      }),

      HealthModule
    ],
    
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
