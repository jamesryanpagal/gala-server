import { ConfigModule as NConfigModule } from "@nestjs/config";

export const config = () => ({
  DBHOST: process.env.DB_HOST,
  DBPORT: parseInt(process.env.DB_PORT),
  DBUSERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB,
  PORT: parseInt(process.env.PORT) || 5550,
  TOKEN_KEY: process.env.TOKEN_KEY,
});

export const ConfigModule = NConfigModule.forRoot({
  isGlobal: true,
  load: [config],
});
