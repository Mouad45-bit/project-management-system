// src/components/ui/DateRange.tsx

import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/dateFormat";

//
type DateRangeProps = {
    startDate: string;
    endDate: string;
};

export function DateRange({ startDate, endDate }: DateRangeProps) {
    return (
        <span className="inline-flex items-center gap-2 text-sm text-slate-700">
            <span>{formatDate(startDate)}</span>
            <ArrowRight size={14} className="text-slate-400" />
            <span>{formatDate(endDate)}</span>
        </span>
    );
}