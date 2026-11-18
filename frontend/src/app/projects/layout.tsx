// src/app/projects/layout.tsx

import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

type ProjectsLayoutProps = {
    children: ReactNode;
};

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
    return <AppShell>{children}</AppShell>;
}