import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/models/internals/schema.ts',
	out: './src/lib/server/models/internals/migrations',
	driver: 'better-sqlite',
	dbCredentials: {
		url: './src/lib/server/models/internals/db.sqlite3',
	},
} satisfies Config;
