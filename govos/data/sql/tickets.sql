CREATE TABLE IF NOT EXISTS `govos.tickets` (
  ticket_id STRING NOT NULL,
  entity_id STRING,
  service_domain STRING,
  created_ts TIMESTAMP,
  closed_ts TIMESTAMP,
  status STRING,
  issue_type STRING,
  priority STRING,
  sla_hours INT64,
  breached BOOL,
  citizen_hash STRING
);
