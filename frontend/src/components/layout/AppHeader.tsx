// src/components/layout/AppHeader.tsx

import { Bell, Search, UserRound } from "lucide-react";

export function AppHeader() {
    return (
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-slate-950">
                        Gestion des projets
                    </p>
                    <p className="text-xs text-slate-500">
                        Création, suivi, archivage et pilotage global
                    </p>
                </div>

                <div className="hidden max-w-md flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
                    <Search size={17} className="mr-2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Recherche globale à venir..."
                        disabled
                        className="w-full bg-transparent text-sm text-slate-500 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
                        aria-label="Notifications"
                    >
                        <Bell size={18} />
                    </button>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <UserRound size={18} />
                    </div>
                </div>
            </div>
        </header>
    );
}