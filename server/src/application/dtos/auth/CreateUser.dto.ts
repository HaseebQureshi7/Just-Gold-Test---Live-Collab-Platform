import { EmailAddress } from "../../../domain/value-objects/EmailAddress.vo.ts";
import { CreateUserDTOProps } from "./interfaces/ICreateUser.type.ts";

export class CreateUserDTO {
    public name: string;
    public email: EmailAddress;
    public password: string;

    constructor(new_user_data: CreateUserDTOProps) {
        this.name = new_user_data.name,
        this.email = new_user_data.email,
        this.password = new_user_data.password
    }
}