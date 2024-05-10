import {Post} from "@prisma/client";
import dbClient from "@/db";

export type PostForList =
    Post &
    {
        topic: { slug: string };
        user: { name: string | null };
        _count: { comments: number };
    };

export function fetchPostsByTopic(slug: string): Promise<PostForList[]> {
    return dbClient.post.findMany({
        where: {
            topic: {slug}
        },
        include: {
            topic: {
                select: {slug: true}
            },
            user: {
                select: {name: true}
            },
            _count: {
                select: {comments: true}
            }
        }
    });
}

export function fetchTopPosts(): Promise<PostForList[]> {
    return dbClient.post.findMany({
        orderBy: {
            comments: {
                _count: "desc"
            }
        },
        include: {
            topic: {
                select: {slug: true}
            },
            user: {
                select: {name: true}
            },
            _count: {
                select: {comments: true}
            }
        },
        take: 5
    });
}