CREATE TABLE IF NOT EXISTS `govos.audit_access` (
  who STRING,
  what STRING,
  entity_id STRING,
  purpose STRING,
  ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);
