import dbClient from '@/db/client';
import {notFound} from "next/navigation";

interface SnippetEditProps {
    params: {
        id: string,
    }
}
export default async function SnippetEditPage(props: SnippetEditProps){
    const snippet = await dbClient.snippet.findFirst({
        where: {
            id: parseInt(props.params.id)
        }
    });

    if(!snippet){
        notFound();
    }

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-4">
                    <button className="p-2 border rounded">Edit</button>
                    <button className="p-2 border rounded">Delete</button>
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