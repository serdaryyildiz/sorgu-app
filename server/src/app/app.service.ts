import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log("server is running");
    return 'Hello World askldjlaksjflkj!';
  }
}
