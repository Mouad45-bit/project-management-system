// src/app/projects/[id]/page.tsx

type ProjectDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProjectDetailPage
({
     params,
 }: ProjectDetailPageProps) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-3xl font-bold text-slate-950">
                Détail du projet #{id}
            </h1>
            <p className="mt-2 text-slate-600">
                Interface de détail à développer dans une phase dédiée.
            </p>
        </main>
    );
}