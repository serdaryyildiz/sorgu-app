import { Processor, WorkerHost } from '@nestjs/bullmq';

@Processor('test-queue')
export class TestProcessor extends WorkerHost {
  async process(job: any) {
    console.log('Received job:', job.name, job.data);
  }
}
