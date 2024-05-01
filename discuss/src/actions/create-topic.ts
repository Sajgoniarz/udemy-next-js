'use server';

import {parseCreateTopic} from "@/validationSchemas/topic";

interface CreateTopicFormState {
    errors: {
        name?: string[],
        description?: string[]
    },
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> {
    const result = parseCreateTopic({
        name: formData.get("name"),
        description: formData.get("description"),
    });

    if (result.error) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    //TODO: Revalidate Homepage
    return {
        errors: {},
    };
}
