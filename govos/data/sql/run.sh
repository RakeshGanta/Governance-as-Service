#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FILES=(
  "init.sql"
  "seed_entities.sql"
  "compute_paths.sql"
  "seed_officers_roles.sql"
  "seed_tickets.sql"
  "seed_timeseries.sql"
  "seed_recommendations.sql"
)

for file in "${FILES[@]}"; do
  echo "Running ${file}"
  bq query --use_legacy_sql=false < "${SCRIPT_DIR}/${file}"
  echo
done
