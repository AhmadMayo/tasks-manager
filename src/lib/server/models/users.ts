import { eq, sql } from 'drizzle-orm';
import type { User } from '$lib/domain-models';
import { users } from './internals/schema';
import db from './db';

export async function getUserByEmail(
	email: string,
): Promise<undefined | (User & { hashedPassword: string })> {
	const result = await db.query.users.findFirst({
		where: eq(users.email, email),
	});

	return result;
}

type NewUser = typeof users.$inferInsert;
export async function createUser(data: NewUser): Promise<User> {
	await db.insert(users).values(data);
	const createdUser = await db.query.users.findFirst({
		columns: {
			hashedPassword: false,
		},
		where: eq(users.email, data.email),
	});

	return createdUser!;
}

export async function getUsersCount() {
	const result = await db.select({ count: sql<number>`count(*)` }).from(users);

	return result[0]?.count || 0;
}

export async function deleteOldestUser() {
	const existingUser = await db.query.users.findFirst();
	if (!existingUser) {
		return;
	}

	await db.delete(users).where(eq(users.id, existingUser.id));
}
