import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";
import { ArgonService } from "src/utils/argon/argon.service";
import {
  ErrorResponseService,
  SuccessResponseService,
} from "src/utils/response/response.service";
import { User, UserRepo } from "src/utils/schema";
import { LoginDto, SignupDto } from "src/utils/types";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: UserRepo,
    private successResponseService: SuccessResponseService,
    private errorResponseService: ErrorResponseService,
    private argonService: ArgonService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async onLogin({ email }: LoginDto) {
    try {
      const user = await this.userService.getUser("email", email);

      const token = await this.jwtService.signAsync(
        { id: user.userid },
        { secret: this.configService.get("TOKEN_KEY") },
      );

      return this.successResponseService.OK({ token, ...user });
    } catch (error) {
      this.errorResponseService.CATCH(error);
    }
  }

  async onSignup({
    firstname,
    middle,
    lastname,
    birthdate,
    address,
    cellphoneNum,
    username,
    email,
    password,
  }: SignupDto) {
    try {
      const hash = await this.argonService.hash(password);

      const createUser = this.userRepo.create({
        firstname,
        middle,
        lastname,
        birthdate,
        address,
        cellphoneNum,
        username,
        email,
        password: hash,
      });

      const user = await this.userRepo.save(createUser);

      const token = await this.jwtService.signAsync(
        { id: user.userid },
        { secret: this.configService.get("TOKEN_KEY") },
      );

      const getUser = await this.userService.getUser("email", email);

      return this.successResponseService.OK({
        token,
        ...getUser,
      });
    } catch (error) {
      this.errorResponseService.CATCH(error);
    }
  }
}
