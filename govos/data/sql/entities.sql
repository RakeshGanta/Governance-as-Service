CREATE TABLE IF NOT EXISTS `govos.entities` (
  entity_id STRING NOT NULL,
  parent_id STRING,
  entity_type STRING,
  name STRING,
  path STRING,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);
