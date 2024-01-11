import { Global, Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { Typeorm } from "./utils/schema/typeorm.module";
import { ConfigModule } from "./utils/config/db.config";
import { UserModule } from "./user/user.module";
import { PhPlacesModule } from './ph-places/ph-places.module';

@Global()
@Module({
  imports: [Typeorm, ConfigModule, AuthModule, UserModule, PhPlacesModule],
})
export class AppModule {}
