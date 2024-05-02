import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './internals/schema';

const sqlite = new Database('src/lib/server/models/internals/db.sqlite3');
const db = drizzle(sqlite, { schema });

migrate(db, { migrationsFolder: 'src/lib/server/models/internals/migrations' });

export default db;
