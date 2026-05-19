// src/components/projects/ProjectProgressBar.tsx

type ProjectProgressBarProps = {
    value: number;
    showLabel?: boolean;
};

export function ProjectProgressBar
({
     value,
     showLabel = true,
}: ProjectProgressBarProps) {
    const safeValue = Math.min(100, Math.max(0, value));

    return (
        <div className="w-full">
            {showLabel ? (
                <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-500">Avancement</span>
                    <span className="font-semibold text-slate-900">{safeValue}%</span>
                </div>
            ) : null}

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                    className="h-full rounded-full bg-slate-900 transition-all"
                    style={{ width: `${safeValue}%` }}
                />
            </div>
        </div>
    );
}