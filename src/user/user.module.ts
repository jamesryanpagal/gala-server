import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeormAuthFeatures } from "src/utils/schema/typeorm.module";
import { ErrorResponseService } from "src/utils/response/response.service";

@Module({
  imports: [TypeormAuthFeatures],
  controllers: [UserController],
  providers: [UserService, ErrorResponseService],
})
export class UserModule {}
