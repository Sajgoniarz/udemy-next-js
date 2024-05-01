'use server';

import {parseCreateTopic} from "@/validationSchemas/topic";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { Topic } from "@prisma/client";
import dbClient from "@/db";
import paths from "@/path";
import {revalidatePath} from "next/cache";

interface CreateTopicFormState {
    errors: {
        name?: string[],
        description?: string[]
        _form?: string[],
    },
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> {
    
    const session = await auth();
    let topic: Topic;
    const result = parseCreateTopic({
        name: formData.get("name"),
        description: formData.get("description"),
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
        topic = await dbClient.topic.create({
            data: {
                slug: result.data?.name,
                description: result.data?.description
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
    revalidatePath(paths.home())

    redirect(paths.topicShow(topic.slug));
}
