'use server'

import dbClient from "@/db/client";
import {redirect} from "next/navigation";

export async function updateSnippet(id: number, code: string) {

    await dbClient.snippet.update({
        where: {id},
        data: {code},
    });

    redirect(`/snippets/${id}`);
}