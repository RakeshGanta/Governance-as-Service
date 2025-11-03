import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="grid gap-6">
      <h2 className="text-xl font-semibold text-slate-800">Choose a portal</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/citizen"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-400"
        >
          <h3 className="text-lg font-semibold text-slate-900">Citizen Intake</h3>
          <p className="mt-2 text-sm text-slate-600">
            Submit civic issues via chat, automatically routed to the right ward twin.
          </p>
        </Link>
        <Link
          href="/officer"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-400"
        >
          <h3 className="text-lg font-semibold text-slate-900">Officer Console</h3>
          <p className="mt-2 text-sm text-slate-600">
            Review at-risk wards and AI-driven recommendations for rapid action.
          </p>
        </Link>
      </div>
    </section>
  );
}
