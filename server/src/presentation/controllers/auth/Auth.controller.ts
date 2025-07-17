import { Request, Response } from "express";
import { CreateUserDTO } from "../../../application/dtos/auth/CreateUser.dto.ts";
import { LoginDTO } from "../../../application/dtos/auth/Login.dto.ts";
import { EmailAddress } from "../../../domain/value-objects/EmailAddress.vo.ts";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler.ts";
import { LoginUseCase } from "../../../application/use-cases/auth/Login.uc.ts";
import { AuthRepository } from "../../../domain/repositories/Auth.repo.ts";
import { CreateUserUseCase } from "../../../application/use-cases/auth/CreateUser.uc.ts";
import { catchAsync } from "../../../shared/utils/CatchAsync.ts";
import { RefreshTokenUseCase } from "../../../application/use-cases/user/RefreshToken.uc.ts";
import { cookieOptions } from "../../../infrastructure/config/cookieOptions.config.ts";
import { GetInfoByTokenUseCase } from "../../../application/use-cases/auth/GetInfoByToken.uc.ts";
import { ViewUserByIdUseCase } from "../../../application/use-cases/user/ViewUserById.uc.ts";

export class AuthController {
  private loginUseCase: LoginUseCase;
  private registerUseCase: CreateUserUseCase;
  private refreshTokenUseCase: RefreshTokenUseCase;
  private viewUserById: ViewUserByIdUseCase;
  private getInfoByTokenUseCase: GetInfoByTokenUseCase;

  constructor(authRepo: AuthRepository) {
    this.loginUseCase = new LoginUseCase(authRepo);
    this.registerUseCase = new CreateUserUseCase(authRepo);
    this.refreshTokenUseCase = new RefreshTokenUseCase();
    this.viewUserById = new ViewUserByIdUseCase(authRepo);
    this.getInfoByTokenUseCase = new GetInfoByTokenUseCase(authRepo);
  }

  register = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const signupDTO = new CreateUserDTO({
      name,
      email: new EmailAddress(email),
      password,
    });

    const user = await this.registerUseCase.execute(signupDTO);

    const loginDetails = new LoginDTO({
      email: new EmailAddress(email),
      password,
    });

    const { accessToken, refreshToken } = await this.loginUseCase.execute(
      loginDetails
    );

    // Set the refresh token in cookies
    res.cookie("accessTokens", accessToken, cookieOptions);
    res.cookie("refreshTokens", refreshToken, cookieOptions);

    ResponseHandler.success(res, "User registered successfully", 201, {
      user,
      accessToken,
      refreshToken,
    });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginDTO = new LoginDTO({
      email: new EmailAddress(email),
      password,
    });

    const { user, accessToken, refreshToken } = await this.loginUseCase.execute(
      loginDTO
    );

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    ResponseHandler.success(res, "Login successful", 200, {
      user,
      accessToken,
      refreshToken,
    });
  });

  refreshToken = catchAsync(async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken;

    const { accessToken, refreshToken } =
      await this.refreshTokenUseCase.execute(oldRefreshToken);

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    ResponseHandler.success(res, "Tokens successfully refreshed", 200, {
      accessToken,
      refreshToken,
    });
  });

  getInfoByToken = catchAsync(async (req: Request, res: Response) => {
    const refreshTokenFromCookie = req.cookies.refreshToken;

    const { user, accessToken, refreshToken } =
      await this.getInfoByTokenUseCase.execute(refreshTokenFromCookie);

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    ResponseHandler.success(res, "User verified successfully", 200, {
      user,
      accessToken,
      refreshToken,
    });
  });

  findUserById = catchAsync(async (req: Request, res: Response) => {
    const uid = req.params.id;
    const user = await this.viewUserById.execute(uid);

    ResponseHandler.success(res, "User found!", 200, user);
  });

  // no usecase logic needed for this controller
  logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true, // Required for HTTPS
      sameSite: "none", // Necessary for cross-origin requests
    });
    
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return ResponseHandler.success(res, "User successfully logged out", 200);
  });
}
