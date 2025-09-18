import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';

@Module({
  providers: [HealthService],
  imports: [TerminusModule , HttpModule],
  controllers: [HealthController]
})
export class HealthModule {}
