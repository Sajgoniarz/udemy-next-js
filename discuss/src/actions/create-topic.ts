'use server';

import {parseCreateTopic} from "@/validationSchemas/topic";
import { auth } from "@/auth";

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
    
    const result = parseCreateTopic({
        name: formData.get("name"),
        description: formData.get("description"),
    });
    
    if(!session?.user){
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

    //TODO: Revalidate Homepage
    return {
        errors: {},
    };
}
