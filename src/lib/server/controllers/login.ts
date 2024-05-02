import bcrypt from 'bcrypt';
import type { DomainError } from '$lib/domain-models';
import { getUserByEmail } from '../models';
import { generateJWTTokens } from '../helpers/jwt';

interface LoginArgs {
	email: string;
	password: string;
}
interface LoginReturn {
	token: string;
	tokenExpiresAt: number;
	refreshToken: string;
	refreshTokenExpiresAt: number;
}
export default async function login({ email, password }: LoginArgs): Promise<LoginReturn> {
	const user = await getUserByEmail(email);
	if (!user) {
		const error: DomainError = {
			key: 'unauthenticated',
			message: 'Invalid credentials',
		};

		throw error;
	}

	const { hashedPassword, ...userPublicData } = user;
	const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
	if (!isPasswordCorrect) {
		const error: DomainError = {
			key: 'unauthenticated',
			message: 'Invalid credentials',
		};

		throw error;
	}

	const tokens = generateJWTTokens(userPublicData);

	return tokens;
}
