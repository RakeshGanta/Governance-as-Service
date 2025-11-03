import './globals.css';
import { ReactNode } from 'react';
import QueryProvider from './query-provider';

export const metadata = {
  title: 'govos platform',
  description: 'Governance-as-a-Service demo twin portal',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <QueryProvider>
          <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-10">
            <header className="flex flex-col gap-2 border-b border-slate-200 pb-6">
              <h1 className="text-3xl font-semibold text-slate-900">govos</h1>
              <p className="text-sm text-slate-600">
                Governance-as-a-Service twin demo for responsive civic operations.
              </p>
            </header>
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
