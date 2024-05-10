import type {Comment} from "@prisma/client";
import dbClient from "@/db";
import {cache} from "react";

export type CommentForCommentList =
    Comment & {
    user: {
        name: string | null;
        image: string | null;
    }
};

export const fetchCommentsByPostId = cache((postId: string): Promise<CommentForCommentList[]> => {
    console.log(`Requesting post ${postId}.`);
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
});
