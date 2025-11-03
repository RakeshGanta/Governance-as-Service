'use client';

import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { createTicket } from '../../lib/api';

export default function CitizenPage() {
  const [message, setMessage] = useState('');
  const mutation = useMutation({
    mutationFn: (body: string) => createTicket(body),
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;
    mutation.mutate(message.trim(), {
      onSuccess: () => setMessage(''),
    });
  };

  const ticket = mutation.data;

  return (
    <section className="grid gap-6">
      <div className="grid gap-2">
        <h2 className="text-2xl font-semibold text-slate-800">Citizen intake</h2>
        <p className="text-sm text-slate-600">
          Describe your civic issue and we will route it to the right ward office.
        </p>
      </div>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Missed garbage pickup on Main Street..."
          className="min-h-[150px] w-full rounded-md border border-slate-300 p-3 text-sm focus:border-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="inline-flex w-fit items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {mutation.isLoading ? 'Submitting…' : 'Submit issue'}
        </button>
        {mutation.isError && (
          <p className="text-sm text-red-600">Unable to submit issue. Please try again.</p>
        )}
      </form>
      {ticket && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-900">
          <p className="font-semibold">Ticket created!</p>
          <p className="mt-1">Ticket ID: {ticket.ticket_id}</p>
          <p>Status: {ticket.status}</p>
        </div>
      )}
    </section>
  );
}
