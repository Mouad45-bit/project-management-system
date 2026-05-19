// src/app/projects/[id]/update/page.tsx

type UpdateProjectPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function UpdateProjectPage
({
     params,
}: UpdateProjectPageProps) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-3xl font-bold text-slate-950">
                Modifier le projet #{id}
            </h1>
            <p className="mt-2 text-slate-600">
                Interface de modification à développer dans une phase dédiée.
            </p>
        </main>
    );
}