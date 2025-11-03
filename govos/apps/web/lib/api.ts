const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
};

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    ...(options.headers || {}),
  };
  const response = await fetch(`${BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }
  return (await response.json()) as T;
}

export function createTicket(message: string) {
  return apiFetch<{ ticket_id: string; entity_id: string; status: string }>(
    '/chat/ticket',
    { method: 'POST', body: { message } }
  );
}

export function getWardHeatmap(user: string) {
  return apiFetch<{ wards: Array<{ entity_id: string; name: string; open_tickets: number }> }>(
    '/analytics/ward_heatmap',
    { headers: { 'x-user': user } }
  );
}

export function getRecommendations(twinId: string, user: string) {
  return apiFetch<{ recommendations: Array<any> }>(
    `/twins/${twinId}/recommendations`,
    { headers: { 'x-user': user } }
  );
}

export function acceptRecommendation(recId: string, user: string) {
  return apiFetch<{ ok: boolean }>(`/recommendations/${recId}/accept`, {
    method: 'POST',
    headers: { 'x-user': user },
  });
}
