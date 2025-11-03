import { runQuery, table } from './db.js';

interface ScopeRow {
  path: string | null;
}

export async function scopePathForUser(userId: string): Promise<string | null> {
  const rows = await runQuery<ScopeRow>(
    `SELECT e.path
     FROM ${table('postings')} p
     JOIN ${table('entities')} e ON p.entity_id = e.entity_id
     WHERE p.user_id = @userId
       AND (p.end_ts IS NULL OR p.end_ts > CURRENT_TIMESTAMP())
     ORDER BY p.start_ts DESC
     LIMIT 1`,
    { userId }
  );
  const path = rows[0]?.path ?? null;
  return path;
}
