import { EmailAddress } from "../../../../domain/value-objects/EmailAddress.vo.ts";

export interface LoginDTOProps {
  email: EmailAddress;
  password: string;
}
