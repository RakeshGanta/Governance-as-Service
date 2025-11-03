CREATE TABLE IF NOT EXISTS `govos.recommendations` (
  rec_id STRING,
  ticket_id STRING,
  twin_id STRING,
  priority STRING,
  assignee STRING,
  target_sla_hours INT64,
  reason STRING,
  created_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  accepted BOOL,
  accepted_by STRING,
  accepted_ts TIMESTAMP
);
