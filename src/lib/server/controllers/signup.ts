import type { DomainError } from '$lib/domain-models';
import { createUser, deleteOldestUser, getUserByEmail, getUsersCount } from '../models';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

interface SignUpArgs {
	name: string;
	email: string;
	password: string;
}
export default async function signup({ password, ...args }: SignUpArgs): Promise<void> {
	const existingUser = await getUserByEmail(args.email);
	if (existingUser) {
		const error: DomainError = {
			key: 'invalid_arguments',
			message: 'User already exists',
		};

		throw error;
	}

	const usersCount = await getUsersCount();
	if (usersCount == 5) {
		await deleteOldestUser();
	}

	const hashedPassword = await bcrypt.hash(password, saltRounds);

	await createUser({
		...args,
		hashedPassword,
	});
}
