import { type SQLiteDatabase } from "expo-sqlite";
export async function initDb(db: SQLiteDatabase) {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        isCompleted BOOLEAN DEFAULT false
        )
        `);
}
