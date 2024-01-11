import { Injectable, NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { ArgonService } from "src/utils/argon/argon.service";
import { ErrorResponseService } from "src/utils/response/response.service";
import { User, UserRepo } from "src/utils/schema";
import { LoginDto, SignupDto } from "src/utils/types";

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private userRepo: UserRepo,
    private argonService: ArgonService,
    private errorResponseService: ErrorResponseService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as LoginDto;

    try {
      const user = await this.userRepo.findOne({
        where: [{ email }, { username: email }],
      });

      if (!!!user) throw this.errorResponseService.INVALID_CREDETIALS();

      const verfiyPassword = await this.argonService.verifyHash(
        user.password,
        password,
      );

      if (!verfiyPassword) throw this.errorResponseService.INVALID_CREDETIALS();
      next();
    } catch (error) {
      this.errorResponseService.CATCH(error);
    }
  }
}

@Injectable()
export class SignupMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private userRepo: UserRepo,
    private errorResponseService: ErrorResponseService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { username, email } = req.body as SignupDto;
    try {
      const getUsername = await this.userRepo.findOne({
        where: { username },
      });

      if (!!getUsername) {
        this.errorResponseService.UNIQUE_FOUND("username");
        return;
      }

      const getEmail = await this.userRepo.findOne({
        where: { email },
      });

      if (!!getEmail) {
        this.errorResponseService.UNIQUE_FOUND("email");
        return;
      }

      next();
    } catch (error) {
      this.errorResponseService.CATCH(error);
    }
  }
}
