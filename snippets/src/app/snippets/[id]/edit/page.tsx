import {notFound} from "next/navigation";
import dbClient from "@/db/client";
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetEditProps {
    params: {
        id: string,
    }
}

export default async function SnippetEditPage(props: SnippetEditProps) {

    const snippet = await dbClient.snippet.findFirst({
        where: {
            id: parseInt(props.params.id)
        }
    });

    if (!snippet) {
        notFound();
    }

    return (
        <div>
            Edit Snippet with title: {snippet.title}
            <SnippetEditForm snippet={snippet}/>
        </div>
    )
}