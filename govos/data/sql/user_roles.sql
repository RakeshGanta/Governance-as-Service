CREATE TABLE IF NOT EXISTS `govos.user_roles` (
  user_id STRING,
  role_id STRING,
  start_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  end_ts TIMESTAMP
);
