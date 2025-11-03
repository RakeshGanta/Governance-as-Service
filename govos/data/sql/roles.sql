CREATE TABLE IF NOT EXISTS `govos.roles` (
  role_id STRING NOT NULL,
  role_name STRING,
  capabilities ARRAY<STRING>
);
