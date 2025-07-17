export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
