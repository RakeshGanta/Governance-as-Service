BEGIN
  -- Schema
  EXECUTE IMMEDIATE """
    CREATE TABLE IF NOT EXISTS `govos.entities` (
      entity_id STRING NOT NULL,
      parent_id STRING,
      entity_type STRING,
      name STRING,
      path STRING,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
    )
  """;

  EXECUTE IMMEDIATE """
    CREATE TABLE IF NOT EXISTS `govos.officers` (
      user_id STRING NOT NULL,
      name STRING,
      status STRING
    )
  """;

  EXECUTE IMMEDIATE """
    CREATE TABLE IF NOT EXISTS `govos.roles` (
      role_id STRING NOT NULL,
      role_name STRING,
      capabilities ARRAY<STRING>
    )
  """;

  EXECUTE IMMEDIATE """
    CREATE TABLE IF NOT EXISTS `govos.user_roles` (
      user_id STRING,
      role_id STRING,
      start_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
      end_ts TIMESTAMP
    )
  """;

  EXECUTE IMMEDIATE """
    CREATE TABLE IF NOT EXISTS `govos.postings` (
      user_id STRING,
      entity_id STRING,
      start_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
      end_ts TIMESTAMP
    )
  """;

  EXECUTE IMMEDIATE """
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
    )
  """;

  EXECUTE IMMEDIATE """
    CREATE TABLE IF NOT EXISTS `govos.twin_state_timeseries` (
      twin_id STRING,
      ts TIMESTAMP,
      open_requests INT64,
      backlog INT64,
      avg_resolution_hours FLOAT64,
      breach_risk_score FLOAT64,
      satisfaction_30d FLOAT64,
      staleness_seconds INT64
    )
  """;

  EXECUTE IMMEDIATE """
    CREATE TABLE IF NOT EXISTS `govos.ticket_predictions` (
      ticket_id STRING,
      twin_id STRING,
      predicted_breached BOOL,
      breach_risk_score FLOAT64,
      scored_at TIMESTAMP
    )
  """;

  EXECUTE IMMEDIATE """
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
    )
  """;

  EXECUTE IMMEDIATE """
    CREATE TABLE IF NOT EXISTS `govos.explanations` (
      entity_kind STRING,
      entity_id STRING,
      ts TIMESTAMP,
      key STRING,
      value STRING
    )
  """;

  EXECUTE IMMEDIATE """
    CREATE TABLE IF NOT EXISTS `govos.audit_access` (
      who STRING,
      what STRING,
      entity_id STRING,
      purpose STRING,
      ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
    )
  """;

  -- Seed data
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.entities` WHERE true
  """;
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.officers` WHERE true
  """;
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.roles` WHERE true
  """;
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.user_roles` WHERE true
  """;
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.postings` WHERE true
  """;
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.tickets` WHERE true
  """;
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.twin_state_timeseries` WHERE true
  """;
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.recommendations` WHERE true
  """;
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.ticket_predictions` WHERE true
  """;
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.explanations` WHERE true
  """;
  EXECUTE IMMEDIATE """
    DELETE FROM `govos.audit_access` WHERE true
  """;
END;
