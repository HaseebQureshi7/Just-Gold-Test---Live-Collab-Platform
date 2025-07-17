import { User as IUser } from "@prisma/client";

export class UserEntity implements IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  avatarUrl: string | null;
  password: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.avatarUrl = user.avatarUrl;
    this.password = user.password;
  }

  updateProfile(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();
  }
}
