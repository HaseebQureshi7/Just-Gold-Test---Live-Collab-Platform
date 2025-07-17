import { UpdateUserDTOProps } from "./interfaces/IUpdateUser.type.ts";

export class UpdateUserDTO {
    public name: string;
    public avatarUrl: string;
    public password: string;

    constructor(new_user_data: UpdateUserDTOProps) {
        this.name = new_user_data.name,
        this.avatarUrl = new_user_data.avatarUrl,
        this.password = new_user_data.password
    }
}