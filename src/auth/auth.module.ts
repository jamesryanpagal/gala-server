import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginMiddleware, SignupMiddleware } from "src/utils/middlewares";
import { TypeormAuthFeatures } from "src/utils/schema/typeorm.module";
import { ArgonService } from "src/utils/argon/argon.service";
import {
  SuccessResponseService,
  ErrorResponseService,
} from "src/utils/response/response.service";
import { JwtModule } from "@nestjs/jwt";
import { JWTGuard } from "./strategy/auth.strat";
import { UserService } from "src/user/user.service";
import { SignupPipe } from "src/utils/pipes/pipes.pipe";

@Module({
  imports: [TypeormAuthFeatures, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    ArgonService,
    SuccessResponseService,
    ErrorResponseService,
    JWTGuard,
    UserService,
    SignupPipe,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginMiddleware)
      .forRoutes("auth/login")
      .apply(SignupMiddleware)
      .forRoutes("auth/signup");
  }
}
