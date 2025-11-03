CREATE TABLE IF NOT EXISTS `govos.postings` (
  user_id STRING,
  entity_id STRING,
  start_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  end_ts TIMESTAMP
);
