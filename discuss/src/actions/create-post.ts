'use server';

import {parseCreatePost} from "@/validationSchemas/post";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {Post} from "@prisma/client";
import dbClient from "@/db";
import paths from "@/path";
import {revalidatePath} from "next/cache";

interface CreatePostFormState {
    errors: {
        title?: string[],
        content?: string[]
        _form?: string[],
    },
}

export async function createPost(
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {

    const session = await auth();
    let post: Post;
    const result = parseCreatePost({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    if (!session?.user) {
        return {
            errors: {
                _form: ["You must be signed in to do this."],
            },
        };
    }

    if (result.error) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    try {
        post = await dbClient.post.create({
            data: {
                title: result.data?.title,
                content: result.data?.content,
                userId: session.user.id
            }
        });
    } catch (err: unknown) {
        return {
            errors: {
                _form: err instanceof Error
                    ? [err.message]
                    : ["Something went wrong"]
            }
        }
    }

    redirect(paths.postShow(post.topicId, post.title));
}
