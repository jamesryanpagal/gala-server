import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, SignupDto } from "src/utils/types";
import { SignupPipe } from "src/utils/pipes/pipes.pipe";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.onLogin(dto);
  }

  @Post("signup")
  signup(@Body(SignupPipe) dto: SignupDto) {
    return this.authService.onSignup(dto);
  }
}
