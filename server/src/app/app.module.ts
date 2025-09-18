import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { HealthModule } from 'src/health/health.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath : ['../../../.env.dev.local' , ],
    isGlobal: true,
    load : [configuration] , 
  }),
    HealthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
