import { EmailAddress } from "../../../../domain/value-objects/EmailAddress.vo.ts";

export interface CreateUserDTOProps {
  name: string;
  email: EmailAddress;
  password: string;
}
