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
    slug: string,
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

    const topic = await dbClient.topic.findFirst({
        where: {
            slug,
        }
    });

    if (!topic) {
        return {
            errors: {
                _form: [`Topic ${slug} could not be found.`],
            }
        }
    }

    try {
        post = await dbClient.post.create({
            data: {
                title: result.data?.title,
                content: result.data?.content,
                userId: session.user.id,
                topicId: topic.id,
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
    
    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.title));
}
