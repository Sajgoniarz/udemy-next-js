'use server'

import dbClient from "@/db/client";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function createSnippet(formState: { messages: Array<string> }, formData: FormData) {

    const messages: Array<string> = [];

    try {
        const title = formData.get("title") as string;
        const code = formData.get("code") as string;

        if (title.length < 3) {
            messages.push("Title is too short");
        }

        if (code.length < 10) {
            messages.push("Code is too short");
        }

        await dbClient.snippet.create({
            data: {
                title, code
            }
        });

    } catch (err: unknown) {
        err instanceof Error
            ? messages.push(err.message)
            : messages.push("Something went wrong...");
    } finally {
        if (messages.length) {
            return {messages};
        }
    }

    revalidatePath("/");
    //USE OUTSIDE try-catch. Handled as ERROR by Next...
    redirect("/");
}

export async function updateSnippet(id: number, code: string) {

    await dbClient.snippet.update({
        where: {id},
        data: {code},
    });

    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {

    await dbClient.snippet.delete({
        where: {id},
    });

    revalidatePath("/");

    redirect("/");
}