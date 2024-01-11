import { SignupDto } from "./validators";

export type UserAuth = Partial<SignupDto> & {
  token: string;
};
