# govos (Governance-as-a-Service)

A small demo platform that models a government "twin" hierarchy. Citizens can submit issues, officers monitor at-risk wards, and AI-driven recommendations flow down a posting tree enforced via path-based scoping.

## Repository layout

```
govos/
  apps/
    api/   # Express + BigQuery service
    web/   # Next.js UI
  data/
    sql/   # BigQuery DDL + seed data
```

## Prerequisites

* Node.js 18+
* npm 9+
* BigQuery dataset `govos` already created
* `gcloud` SDK configured with `gcloud auth application-default login`

## Data setup

```bash
cd data/sql
bash run.sh
```

The script sequentially runs schema creation, hierarchy seeds, ticket data, and time-series snapshots.

## API (Express)

```bash
cd apps/api
cp .env.example .env  # populate GOOGLE_CLOUD_PROJECT
npm install
npm run dev
```

The API listens on `PORT` (default `8080`) and exposes:

* `POST /chat/ticket`
* `GET /twins/:id`
* `GET /twins/:id/recommendations`
* `POST /recommendations/:rec_id/accept`
* `GET /analytics/ward_heatmap`
* `GET /tickets/:id`

## Web (Next.js)

```bash
cd apps/web
cp .env.example .env.local  # adjust NEXT_PUBLIC_API_BASE if needed
npm install
npm run dev
```

Open http://localhost:3000 and navigate to:

* `/citizen` – submit issues and see ticket confirmations.
* `/officer` – view at-risk wards, AI recommendations, and accept actions.

## Testing the flow

```bash
# With the API running
curl -X POST http://localhost:8080/chat/ticket \
  -H 'content-type: application/json' \
  -d '{"message":"missed garbage pickup"}'
```

## Production notes

* Deploy API to Cloud Run (Dockerfile provided) and set `NEXT_PUBLIC_API_BASE` accordingly.
* Deploy web on Vercel or Cloud Run static hosting.
* Consider Dataform or dbt for managing SQL pipelines, and explore BigLake/Iceberg + VPC-SC if extending to production workloads.
