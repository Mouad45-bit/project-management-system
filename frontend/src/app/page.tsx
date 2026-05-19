// src/app/page.tsx

import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";

export default function HomePage() {
  return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <section className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <FolderKanban size={28} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Système de management des projets
          </p>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-950">
            Module Gestion des projets
          </h1>

          <p className="mb-8 max-w-2xl text-base leading-7 text-slate-600">
            Ce module permet de créer, consulter, modifier, archiver et piloter
            les projets. Le frontend travaille d’abord avec des données mockées,
            puis sera connecté aux APIs Spring Boot.
          </p>

          <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Accéder aux projets
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>
  );
}