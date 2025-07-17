import { Router } from "express";
import { AuthController } from "../../controllers/auth/Auth.controller.ts";
import { AuthRepositoryImpl } from '../../../infrastructure/repositories/auth/Auth.impl.ts';

const authRepo = new AuthRepositoryImpl();
const authController = new AuthController(authRepo);
const authRouter = Router();

authRouter.post("/signup", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refreshToken);
authRouter.get("/:id", authController.findUserById);
authRouter.post("/me", authController.getInfoByToken); // Get user by token / Auto-login 
authRouter.post("/logout", authController.logout); 

export default authRouter;
