import Image from "next/image";
import {db} from "@/db/client";

export default async function Home() {

    const snippets = await db.snippet.findMany();

    const renderedSnippets = snippets.map(s => (
        <div key={s.id}>{s.title}</div>
    ));

    return (
        <main>
            Home Page
            {renderedSnippets}
        </main>
    );
}
