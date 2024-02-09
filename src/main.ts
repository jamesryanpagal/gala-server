import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(ConfigService);
  const port = appService.get("PORT");
  const host = appService.get("SERVERHOST");

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, host, () => {});
  console.log(`Running on port ${port} host ${host}`);
}
bootstrap();
