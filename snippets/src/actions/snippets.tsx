'use server'

import dbClient from "@/db/client";
import {redirect} from "next/navigation";

export async function createSnippet(formState: { messages: Array<string> }, formData: FormData) {

    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    const messages: Array<string> = [];

    if (title.length < 3) {
        messages.push("Title is too short");
    }

    if (code.length < 10) {
        messages.push("Code is too short");
    }

    if (messages.length) {
        return {messages};
    }

    const createdSnippet = await dbClient.snippet.create({
        data: {
            title, code
        }
    });

    redirect("/");
}

export async function updateSnippet(id: number, code: string) {

    await dbClient.snippet.update({
        where: {id},
        data: {code},
    });

    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {

    await dbClient.snippet.delete({
        where: {id},
    });

    redirect("/");
}