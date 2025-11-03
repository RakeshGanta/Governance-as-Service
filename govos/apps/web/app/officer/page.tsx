'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { acceptRecommendation, getRecommendations, getWardHeatmap } from '../../lib/api';

const DEMO_USER = 'rahul@maha.gov';
const WARD_TWIN_ID = 'ward12_sanitation';

export default function OfficerPage() {
  const queryClient = useQueryClient();

  const { data: wards, isLoading: wardsLoading, isError: wardsError } = useQuery({
    queryKey: ['wardHeatmap', DEMO_USER],
    queryFn: () => getWardHeatmap(DEMO_USER),
  });

  const { data: recs, isLoading: recsLoading, isError: recsError } = useQuery({
    queryKey: ['recommendations', WARD_TWIN_ID, DEMO_USER],
    queryFn: () => getRecommendations(WARD_TWIN_ID, DEMO_USER),
  });

  const acceptMutation = useMutation({
    mutationFn: (recId: string) => acceptRecommendation(recId, DEMO_USER),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', WARD_TWIN_ID, DEMO_USER] });
    },
  });

  return (
    <section className="grid gap-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Officer console</h2>
          <p className="text-sm text-slate-600">Monitor ward health and act on AI recommendations.</p>
        </div>
        <span className="rounded-full border border-slate-300 bg-white px-4 py-1 text-xs font-medium text-slate-700">
          Viewing as: {DEMO_USER}
        </span>
      </div>

      <section className="grid gap-4">
        <header className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-800">At-risk wards</h3>
          <span className="text-xs uppercase tracking-wide text-slate-500">Open tickets</span>
        </header>
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          {wardsLoading && <p className="p-4 text-sm text-slate-500">Loading ward data…</p>}
          {wardsError && <p className="p-4 text-sm text-red-600">Unable to load ward analytics.</p>}
          {!wardsLoading && !wardsError && (
            <ul className="divide-y divide-slate-200">
              {wards?.wards.length ? (
                wards.wards.map((ward) => (
                  <li key={ward.entity_id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-800">{ward.name}</p>
                      <p className="text-xs text-slate-500">{ward.entity_id}</p>
                    </div>
                    <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                      {ward.open_tickets}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-slate-500">No active wards in your scope.</li>
              )}
            </ul>
          )}
        </div>
      </section>

      <section className="grid gap-4">
        <header className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-800">Recommendations (Ward-12)</h3>
          <span className="text-xs uppercase tracking-wide text-slate-500">AI actions</span>
        </header>
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          {recsLoading && <p className="p-4 text-sm text-slate-500">Loading recommendations…</p>}
          {recsError && <p className="p-4 text-sm text-red-600">Unable to load recommendations.</p>}
          {!recsLoading && !recsError && (
            <ul className="divide-y divide-slate-200">
              {recs?.recommendations.length ? (
                recs.recommendations.map((rec) => (
                  <li key={rec.rec_id} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{rec.reason}</p>
                      <p className="text-xs text-slate-500">Target SLA: {rec.target_sla_hours}h • Priority {rec.priority}</p>
                    </div>
                    <button
                      onClick={() => acceptMutation.mutate(rec.rec_id)}
                      disabled={acceptMutation.isLoading}
                      className="inline-flex w-fit items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
                    >
                      {acceptMutation.isLoading ? 'Accepting…' : 'Accept'}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-slate-500">No recommendations pending.</li>
              )}
            </ul>
          )}
        </div>
      </section>
    </section>
  );
}
