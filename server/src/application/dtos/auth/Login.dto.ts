import { EmailAddress } from "../../../domain/value-objects/EmailAddress.vo.ts";
import { LoginDTOProps } from "./interfaces/ILogin.type.ts";

export class LoginDTO {
  public email: EmailAddress;
  public password: string;

  constructor(loginData: LoginDTOProps) {
    this.email = loginData.email;
    this.password = loginData.password;
  }
}
