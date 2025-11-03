INSERT INTO `govos.twin_state_timeseries` (twin_id, ts, open_requests, backlog, avg_resolution_hours, breach_risk_score, satisfaction_30d, staleness_seconds)
WITH hours AS (
  SELECT GENERATE_ARRAY(0, 23) AS offsets
), expanded AS (
  SELECT offset FROM hours, UNNEST(offsets) AS offset
)
SELECT
  'ward12_sanitation' AS twin_id,
  TIMESTAMP_SUB(TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), HOUR), INTERVAL offset HOUR) AS ts,
  15 + CAST(24 - offset AS INT64) AS open_requests,
  40 + CAST(offset / 2 AS INT64) AS backlog,
  18.0 + offset * 0.3 AS avg_resolution_hours,
  0.35 + offset * 0.01 AS breach_risk_score,
  0.72 - offset * 0.002 AS satisfaction_30d,
  offset * 3600 AS staleness_seconds
FROM expanded;
