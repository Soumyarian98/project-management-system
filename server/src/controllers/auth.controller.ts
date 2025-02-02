import type { Request, Response } from "express";
import {
	SignUpCommand,
	type SignUpCommandInput,
	CognitoIdentityProviderClient,
	ConfirmSignUpCommand,
	type ConfirmSignUpCommandInput,
	ResendConfirmationCodeCommand,
	type ResendConfirmationCodeCommandInput,
	InitiateAuthCommand,
	type InitiateAuthCommandInput,
	InvalidParameterException,
	UserNotFoundException,
	ForgotPasswordCommand,
	type ForgotPasswordCommandInput,
	ConfirmForgotPasswordCommand,
	type ConfirmForgotPasswordCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "node:crypto";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;
const clientId = process.env.COGNITO_CLIENT_ID as string;
const clientSecret = process.env.COGNITO_CLIENT_SECRET as string;

const computeSecretHash = (
	username: string,
	clientId: string,
	clientSecret: string,
): string => {
	const message = username + clientId;
	return crypto
		.createHmac("sha256", clientSecret)
		.update(message)
		.digest("base64");
};

const client = new CognitoIdentityProviderClient({
	region: "ap-south-1",
	credentials: {
		accessKeyId,
		secretAccessKey,
	},
});

export const signUp = async (req: Request, res: Response) => {
	try {
		const { username, password, email, name, gender } = req.body;
		const input: SignUpCommandInput = {
			ClientId: clientId,
			SecretHash: computeSecretHash(username, clientId, clientSecret),
			Username: username,
			Password: password,
			UserAttributes: [
				{ Name: "name", Value: name },
				{ Name: "email", Value: email },
				{ Name: "gender", Value: gender },
			],
		};
		const command = new SignUpCommand(input);
		const response = await client.send(command);
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to sign up" });
	}
};
export const confirmSignup = async (req: Request, res: Response) => {
	try {
		const { code, username } = req.body;
		const input: ConfirmSignUpCommandInput = {
			ClientId: clientId,
			SecretHash: computeSecretHash(username, clientId, clientSecret),
			Username: username,
			ConfirmationCode: code,
		};
		const command = new ConfirmSignUpCommand(input);
		const response = await client.send(command);
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to sign up" });
	}
};

export const resendConfirmation = async (req: Request, res: Response) => {
	try {
		const { username } = req.body;
		const input: ResendConfirmationCodeCommandInput = {
			ClientId: clientId,
			SecretHash: computeSecretHash(username, clientId, clientSecret),
			Username: username,
		};
		const command = new ResendConfirmationCodeCommand(input);
		const response = await client.send(command);
		res.json(response);
	} catch (error) {
		console.log(error);
		if (error instanceof InvalidParameterException) {
			res.status(400).json({ message: error.message });
		} else if (error instanceof UserNotFoundException) {
			res.status(400).json({ message: "Username not found" });
		} else {
			res.status(500).json({ message: "Failed to resend verificatioon code" });
		}
	}
};

export const signIn = async (req: Request, res: Response) => {
	try {
		const { password, username } = req.body;
		const input: InitiateAuthCommandInput = {
			AuthFlow: "USER_PASSWORD_AUTH",
			AuthParameters: {
				PASSWORD: password,
				SECRET_HASH: computeSecretHash(username, clientId, clientSecret),
				USERNAME: username,
			},
			ClientId: clientId,
		};
		const command = new InitiateAuthCommand(input);
		const response = await client.send(command);
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to sign up" });
	}
};

export const forgetPassword = async (req: Request, res: Response) => {
	try {
		const { username } = req.body;
		const input: ForgotPasswordCommandInput = {
			ClientId: clientId,
			SecretHash: computeSecretHash(username, clientId, clientSecret),
			Username: username,
		};
		const command = new ForgotPasswordCommand(input);
		const response = await client.send(command);
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to sign up" });
	}
};

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { username, password, code } = req.body;
		const input: ConfirmForgotPasswordCommandInput = {
			ClientId: clientId,
			SecretHash: computeSecretHash(username, clientId, clientSecret),
			Username: username,
			ConfirmationCode: code,
			Password: password,
		};
		const command = new ConfirmForgotPasswordCommand(input);
		const response = await client.send(command);
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to sign up" });
	}
};
