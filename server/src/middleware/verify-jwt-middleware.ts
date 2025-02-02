import { CognitoJwtVerifier } from "aws-jwt-verify";
import type { NextFunction, Request, Response } from "express";

const clientId = process.env.COGNITO_CLIENT_ID as string;
const userPoolId = process.env.COGNITO_USER_POOL_ID as string;

const verifier = CognitoJwtVerifier.create({
	userPoolId: userPoolId,
	tokenUse: "access",
	clientId: clientId,
});

export const verifyJWT = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			res.status(401).json({ message: "Unauthorized" });
		}
		const payload = await verifier.verify(token as string);
		next();
	} catch {
		res.status(401).json({ message: "Unauthorized" });
	}
};
