import Image from "next/image";
import dbClient from "@/db/client";
import Link from "next/link";

export default async function Home() {

    const snippets = await dbClient.snippet.findMany();

    const renderedSnippets = snippets.map(s => (
        <Link key={s.id}
            className="flex justify-between items-center p-2 border rounded"
            href={`/snippets/${s.id}`}
        >
            {s.title}
        </Link>
    ));

    return (
        <main>
            <div className="flex m-2 justify-between items-center">
                <h1 className="text-xl font-bold">Snippets</h1>
                <Link className="border rounded p-2" href="snippets/new">New</Link>
            </div>
            <div className="flex gap-2 flex-col">
                {renderedSnippets}
            </div>
        </main>
    );
}
