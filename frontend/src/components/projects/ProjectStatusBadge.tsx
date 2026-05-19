// src/components/projects/ProjectStatusBadge.tsx

import type { ProjectStatus } from "@/types/project";
import {
    getProjectStatusClassName,
    getProjectStatusLabel,
} from "@/lib/statusFormat";
import { cn } from "@/lib/classNames";

type ProjectStatusBadgeProps = {
    status: ProjectStatus;
    className?: string;
};

export function ProjectStatusBadge
({
     status,
     className,
}: ProjectStatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
                getProjectStatusClassName(status),
                className,
            )}
        >
      {getProjectStatusLabel(status)}
    </span>
    );
}