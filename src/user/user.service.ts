import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorResponseService } from "src/utils/response/response.service";
import { User, UserRepo } from "src/utils/schema";
import { SignupDto } from "src/utils/types";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: UserRepo,
    private errorResponseService: ErrorResponseService,
  ) {}

  async getUser(key: keyof SignupDto, value: string) {
    try {
      const user = await this.userRepo.findOne({
        where:
          key === "email"
            ? [{ email: value }, { username: value }]
            : { [key]: value },
        select: [
          "firstname",
          "middle",
          "lastname",
          "birthdate",
          "address",
          "cellphoneNum",
          "username",
          "email",
        ],
      });

      if (!!!user) {
        this.errorResponseService.NOT_FOUND("user");
        return;
      }

      return user;
    } catch (error) {
      this.errorResponseService.CATCH(error);
    }
  }
}
