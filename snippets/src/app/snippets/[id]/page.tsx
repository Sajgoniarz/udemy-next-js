import dbClient from '@/db/client';
import {notFound} from "next/navigation";
import Link from "next/link";
import {deleteSnippet} from "@/actions/snippets";

interface SnippetViewProps {
    params: {
        id: string,
    }
}
export default async function SnippetViewPage(props: SnippetViewProps){
    const snippet = await dbClient.snippet.findFirst({
        where: {
            id: parseInt(props.params.id)
        }
    });

    if(!snippet){
        notFound();
    }

    const onDeleteSnippet = deleteSnippet.bind(null, snippet.id);

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-4">
                    <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">Edit</Link>
                    <form action={onDeleteSnippet}>
                        <button className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounder bg-gray-200 border-gray-200">
                <code>
                    {snippet.code}
                </code>
            </pre>
        </div>
    );
}

export async function generateStaticParams() {

    const snippets = await dbClient.snippet.findMany();

    return snippets.map(snippet => ({id: snippet.id.toString()}))
}