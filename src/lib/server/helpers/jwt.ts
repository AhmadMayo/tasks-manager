import type { User } from '$lib/domain-models';
import jwt from 'jsonwebtoken';

// Should be stored securely
const jwtSecretKey = 'Hello World!';
const issuer = 'Tasks Manager';
const tokenDuration = 60 * 5; // Tokens expire after 5 minutes
const refreshTokenDuration = 60 * 60 * 24; // Refresh token expires after 24 hours

export function generateJWTTokens(user: User) {
	const nowInSeconds = Math.round(Date.now() / 1000);
	const commonPayload = {
		iss: issuer,
		sub: user.id,
		iat: nowInSeconds,
	};
	const tokenExpiresAt = nowInSeconds + tokenDuration;
	const refreshTokenExpiresAt = nowInSeconds + refreshTokenDuration;

	const token = jwt.sign(
		{
			...commonPayload,
			exp: tokenExpiresAt,
			user,
		},
		jwtSecretKey,
	);
	const refreshToken = jwt.sign(
		{
			...commonPayload,
			exp: refreshTokenExpiresAt,
		},
		jwtSecretKey,
	);

	return { token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt };
}

export function validateToken(token: string): boolean {
	try {
		jwt.verify(token, jwtSecretKey, { issuer });
		return true;
	} catch (error) {
		return false;
	}
}
