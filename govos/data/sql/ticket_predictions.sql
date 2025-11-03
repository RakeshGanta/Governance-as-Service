CREATE TABLE IF NOT EXISTS `govos.ticket_predictions` (
  ticket_id STRING,
  twin_id STRING,
  predicted_breached BOOL,
  breach_risk_score FLOAT64,
  scored_at TIMESTAMP
);
