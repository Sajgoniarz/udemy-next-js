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

    return <div>Edit snippet: {snippet.title}</div>
}