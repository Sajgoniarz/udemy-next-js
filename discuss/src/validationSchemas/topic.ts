import {z} from "zod";

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, {
        message: "Topic can have only lower letters without spaces"
    }),
    description: z.string().min(10)
});

export const parseCreateTopic = createTopicSchema.safeParse