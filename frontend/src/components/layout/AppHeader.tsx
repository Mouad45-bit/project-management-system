// src/components/layout/AppHeader.tsx

import { Bell, Search, UserRound } from "lucide-react";

export function AppHeader() {
    return (
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
            <div className="relative flex items-center justify-end gap-4">
                <div className="absolute left-1/2 top-1/2 hidden w-full max-w-xl -translate-x-1/2 -translate-y-1/2 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
                    <Search size={15} className="mr-2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Recherche globale à venir..."
                        disabled
                        className="w-full bg-transparent text-sm text-slate-500 outline-none placeholder:text-sm placeholder:text-slate-400 disabled:cursor-not-allowed"
                    />
                </div>

                <div className="relative z-10 flex items-center gap-3">
                    <button
                        type="button"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
                        aria-label="Notifications"
                    >
                        <Bell size={18} />
                    </button>

                    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-transparent bg-slate-900 text-white transition hover:border-slate-300 hover:bg-slate-800">
                        <UserRound size={18} />
                    </div>
                </div>
            </div>
        </header>
    );
}