// src/app/page.tsx

import Link from "next/link";
import {
  ArrowRight,
  FolderKanban,
  LayoutDashboard,
  Layers3,
} from "lucide-react";

export default function HomePage() {
  return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <section className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
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
            les projets.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
                href="/projects"
                className="group rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white transition hover:bg-slate-700"
            >
              <div className="mb-4 text-white flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <LayoutDashboard size={22} />
              </div>

              <h2 className="mb-2 text-white font-semibold">Accéder au module</h2>
              <p className="mb-4 text-sm leading-6 text-slate-200">
                Ouvrir l’espace de gestion des projets avec navigation latérale.
              </p>

              <span className="inline-flex text-white items-center gap-2 text-sm font-semibold">
              Continuer
              <ArrowRight
                  size={17}
                  className="transition text-white group-hover:translate-x-1"
              />
            </span>
            </Link>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-700">
                <Layers3 size={22} />
              </div>

              <h2 className="mb-2 font-semibold text-slate-950">
                Périmètre actuel
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Interfaces prévues : liste des projets, création, détail,
                modification, archives et navigation vers les futurs modules.
              </p>
            </div>
          </div>
        </section>
      </main>
  );
}