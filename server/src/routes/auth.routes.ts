import { Router } from "express";
import {
	confirmSignup,
	forgetPassword,
	resendConfirmation,
	resetPassword,
	signIn,
	signUp,
} from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.post("/confirm-signup", confirmSignup);
authRouter.post("/resend-confirmation", resendConfirmation);
authRouter.patch("/forget-password", forgetPassword);
authRouter.patch("/reset-password", resetPassword);
