import Database from '@tauri-apps/plugin-sql';

let _db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!_db) {
    _db = await Database.load('sqlite:wordapp.db');
  }
  return _db;
}

export async function dbSelect<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  const db = await getDb();
  return db.select<T[]>(sql, params);
}

export async function dbExecute(sql: string, params: unknown[] = []): Promise<void> {
  const db = await getDb();
  await db.execute(sql, params);
}

export async function runMigrations(): Promise<void> {
  try {
    await dbExecute(
      'ALTER TABLE word_pairs ADD COLUMN disabled INTEGER NOT NULL DEFAULT 0'
    );
  } catch {
    // Column already exists — safe to ignore
  }
}
