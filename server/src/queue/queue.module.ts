import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestProcessor } from './queue.processor';

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(config:ConfigService) => {

        const host = config.get<string>("REDIS_HOST");
        const port = Number(config.get<string>("REDIS_PORT"));

        if(!Number.isFinite(port)){
          throw new Error(
            `Invalid redis port value\nPort Value :${port}`
          );
        }

        return {
          connection : {
            host ,
            port
          },
        };
      },

    }),

    BullModule.registerQueue({
      name: "test-queue",
    })

  ],


  controllers: [QueueController],
  providers: [TestProcessor]
})
export class QueueModule {}
