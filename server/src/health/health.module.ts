import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [HealthService],
  imports: [TerminusModule , HttpModule]
})
export class HealthModule {}
