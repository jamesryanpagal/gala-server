import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get("NESTPORT");
  const host = app.get(ConfigService).get("SERVERHOST");

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, !!host && `"${host}"`, () => {
    console.log(`Listening on port: ${port}\nhosted on ${host}`);
  });
}
bootstrap();
