import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { runQuery, table } from './db.js';
import { currentUser } from './auth.js';
import { scopePathForUser } from './visibility.js';

const app = express();
app.use(cors());
app.use(express.json());

const messageSchema = z.object({
  message: z.string().min(3),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

function classifyIssue(message: string): string {
  const lower = message.toLowerCase();
  if (/garbage|trash|waste/.test(lower)) return 'GARBAGE';
  if (/water|leak/.test(lower)) return 'WATER';
  if (/road|pothole/.test(lower)) return 'ROADS';
  return 'GENERAL';
}

app.post('/chat/ticket', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = messageSchema.parse(req.body);
    const issueType = classifyIssue(body.message);
    const ticketId = uuidv4();
    const entityId = 'ward12_sanitation';

    await runQuery(
      `INSERT INTO ${table('tickets')} (ticket_id, entity_id, service_domain, created_ts, status, issue_type, priority, sla_hours, breached, citizen_hash)
       VALUES (@ticketId, @entityId, 'sanitation', CURRENT_TIMESTAMP(), 'OPEN', @issueType, 'MEDIUM', 48, FALSE, 'anon')`,
      { ticketId, entityId, issueType }
    );

    res.status(201).json({ ticket_id: ticketId, entity_id: entityId, status: 'OPEN' });
  } catch (err) {
    next(err);
  }
});

app.get('/twins/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const entities = await runQuery(
      `SELECT entity_id, name, entity_type, path, created_at
       FROM ${table('entities')}
       WHERE entity_id = @id`,
      { id }
    );
    if (entities.length === 0) {
      return res.status(404).json({ error: 'Twin not found' });
    }
    const [latestState] = await runQuery(
      `SELECT twin_id, ts, open_requests, backlog, avg_resolution_hours, breach_risk_score, satisfaction_30d, staleness_seconds
       FROM ${table('twin_state_timeseries')}
       WHERE twin_id = @id
       ORDER BY ts DESC
       LIMIT 1`,
      { id }
    );
    res.json({ entity: entities[0], latest_state: latestState || null });
  } catch (err) {
    next(err);
  }
});

app.get('/twins/:id/recommendations', async (req, res, next) => {
  try {
    const { id } = req.params;
    const recs = await runQuery(
      `SELECT rec_id, ticket_id, twin_id, priority, assignee, target_sla_hours, reason, created_ts, accepted, accepted_by, accepted_ts
       FROM ${table('recommendations')}
       WHERE twin_id = @id AND (accepted IS NULL OR accepted = FALSE)
       ORDER BY created_ts DESC`,
      { id }
    );
    res.json({ recommendations: recs });
  } catch (err) {
    next(err);
  }
});

app.post('/recommendations/:rec_id/accept', async (req, res, next) => {
  try {
    const { rec_id } = req.params;
    const user = currentUser(req);

    const recs = await runQuery<{ rec_id: string; twin_id: string }>(
      `SELECT rec_id, twin_id FROM ${table('recommendations')} WHERE rec_id = @recId`,
      { recId: rec_id }
    );
    if (recs.length === 0) {
      return res.status(404).json({ error: 'Recommendation not found' });
    }
    const twinId = recs[0].twin_id;

    await runQuery(
      `UPDATE ${table('recommendations')}
       SET accepted = TRUE,
           accepted_by = @user,
           accepted_ts = CURRENT_TIMESTAMP()
       WHERE rec_id = @recId`,
      { user, recId: rec_id }
    );

    await runQuery(
      `INSERT INTO ${table('audit_access')} (who, what, entity_id, purpose)
       VALUES (@user, 'ACCEPT_RECOMMENDATION', @entityId, 'action')`,
      { user, entityId: twinId }
    );

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

app.get('/analytics/ward_heatmap', async (req, res, next) => {
  try {
    const user = currentUser(req);
    const path = await scopePathForUser(user);
    if (!path) {
      return res.status(403).json({ error: 'No scope for user' });
    }

    const wards = await runQuery(
      `SELECT e.entity_id, e.name, e.entity_type, e.path,
              COUNTIF(t.status = 'OPEN') AS open_tickets
       FROM ${table('entities')} e
       LEFT JOIN ${table('tickets')} t ON e.entity_id = t.entity_id
       WHERE e.path LIKE CONCAT(@scope, '%')
         AND (LOWER(e.entity_type) = 'ward' OR LOWER(e.entity_type) = 'office')
       GROUP BY e.entity_id, e.name, e.entity_type, e.path
       ORDER BY open_tickets DESC, e.name ASC`,
      { scope: path }
    );

    res.json({ wards });
  } catch (err) {
    next(err);
  }
});

app.get('/tickets/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await runQuery(
      `SELECT ticket_id, entity_id, service_domain, created_ts, closed_ts, status, issue_type, priority, sla_hours, breached
       FROM ${table('tickets')}
       WHERE ticket_id = @ticketId`,
      { ticketId: id }
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = Number(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`govos api listening on port ${port}`);
});
