CREATE TABLE IF NOT EXISTS `govos.twin_state_timeseries` (
  twin_id STRING,
  ts TIMESTAMP,
  open_requests INT64,
  backlog INT64,
  avg_resolution_hours FLOAT64,
  breach_risk_score FLOAT64,
  satisfaction_30d FLOAT64,
  staleness_seconds INT64
);
