import { PrismaClient } from "@prisma/client";
import { LoginDTO } from "../../../application/dtos/auth/Login.dto.ts";
import { CreateUserDTO } from "../../../application/dtos/auth/CreateUser.dto.ts";
import { UserEntity } from "../../../domain/entities/User.entity.ts";
import { AuthRepository } from "../../../domain/repositories/Auth.repo.ts";
import { prisma } from "../../database/client.ts";
import { PasswordService } from "../../../shared/services/PasswordService.ts";
import { SafeUser } from "../../../domain/interfaces/ISafeUser.type.ts";

export class AuthRepositoryImpl implements AuthRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    return user ? new UserEntity(user) : null;
  }

  async findUserById(uid: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: uid },
    });

    return user ? new UserEntity(user) : null;
  }

  async create(user: CreateUserDTO): Promise<SafeUser> {
    // **Use PasswordService to hash the password**
    const hashedPassword = await PasswordService.hashPassword(user.password);

    const newUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email.value,
        password: hashedPassword, // Store hashed password
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true, // Include necessary fields
        updatedAt: true,
      },
    });
    return newUser as SafeUser;
  }

  async login(user: LoginDTO): Promise<SafeUser | null> {
    const foundUser = await this.findUserByEmail(user.email.value);
    if (!foundUser) return null;

    // **Use PasswordService to compare passwords**
    const isPasswordValid = await PasswordService.comparePassword(
      user.password,
      foundUser.password
    );
    if (!isPasswordValid) return null;

    return foundUser;
  }
}
