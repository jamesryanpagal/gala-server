import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignupDto {
  @IsNotEmpty()
  firstname: string;

  middle: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  birthdate: string;

  @IsNotEmpty()
  gender: number;

  @IsNotEmpty()
  region: string;

  province: string;

  @IsNotEmpty()
  cityormunicipality: string;

  @IsNotEmpty()
  cellphonenum: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
