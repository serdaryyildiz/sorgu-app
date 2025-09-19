import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('queue')
export class QueueController {
  constructor(@InjectQueue('test-queue') private readonly testQ: Queue) {}

  @Get('add')
  async addJob() {
    await this.testQ.add('simple-job', { test: 'hello world' });
    return { status: 'ok' };
  }
}
