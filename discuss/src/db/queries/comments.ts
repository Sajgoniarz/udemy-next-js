import type {Comment} from "@prisma/client";
import dbClient from "@/db";

export type CommentForCommentList =
    Comment & {
    user: {
        name: string | null;
        image: string | null;
    }
};

export function fetchCommentsByPostId(postId: string): Promise<CommentForCommentList[]> {
    return dbClient.comment.findMany({
        where: {
            postId,
        },
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
    });
}

