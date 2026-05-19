// src/components/layout/AppSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    CalendarClock,
    CheckSquare,
    FolderKanban,
    LayoutDashboard,
    MessageSquare,
    Network,
    Users,
} from "lucide-react";
import { cn } from "@/lib/classNames";

const navigationItems = [
    {
        label: "Vue générale",
        href: "/",
        icon: LayoutDashboard,
        disabled: false,
    },
    {
        label: "Projets",
        href: "/projects",
        icon: FolderKanban,
        disabled: false,
    },
    {
        label: "Tâches",
        href: "#",
        icon: CheckSquare,
        disabled: true,
    },
    {
        label: "Échéances",
        href: "#",
        icon: CalendarClock,
        disabled: true,
    },
    {
        label: "Ressources humaines",
        href: "#",
        icon: Users,
        disabled: true,
    },
    {
        label: "Visualisation",
        href: "#",
        icon: Network,
        disabled: true,
    },
    {
        label: "Reporting",
        href: "#",
        icon: BarChart3,
        disabled: true,
    },
    {
        label: "Collaboration",
        href: "#",
        icon: MessageSquare,
        disabled: true,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden min-h-screen w-72 shrink-0 border-r border-slate-200 bg-white px-4 py-6 lg:block">
            <div className="mb-8 flex items-center gap-3 px-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <FolderKanban size={22} />
                </div>

                <div>
                    <p className="text-sm font-bold text-slate-950">
                        Project Management
                    </p>
                    <p className="text-xs text-slate-500">Système de pilotage</p>
                </div>
            </div>

            <nav className="space-y-1">
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                        item.href !== "/" && pathname.startsWith(item.href);

                    if (item.disabled) {
                        return (
                            <div
                                key={item.label}
                                className="flex cursor-not-allowed items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-400"
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </div>
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                                    Bientôt
                                </span>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                                isActive
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                            )}
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}