import { BigQuery } from '@google-cloud/bigquery';

const projectId = process.env.GOOGLE_CLOUD_PROJECT;
const datasetId = process.env.BQ_DATASET || 'govos';

export const bigquery = new BigQuery({ projectId });

export const table = (name: string) => {
  if (projectId) {
    return `\`${projectId}.${datasetId}.${name}\``;
  }
  return `\`${datasetId}.${name}\``;
};

export async function runQuery<T = any>(query: string, params: Record<string, any> = {}) {
  const [rows] = await bigquery.query({
    query,
    params,
    useLegacySql: false,
  });
  return rows as T[];
}
