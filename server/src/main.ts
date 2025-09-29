import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:"http://localhost:5173",
    methods: ["GET" , "POST" , "PUT" , "PATCH" ,"DELETE"],
    allowHeaders: ["Content-Type" , "Authortization"],
    credentials:true,
    optionsSuccessStatus:204
  })

  const { redis_port } = configuration();
  console.log(redis_port);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
