import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import PostShowSkeleton from "@/components/posts/post-skeleton";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/path";
import {Suspense} from "react";


interface PostShowPageProps {
    params: {
        slug: string;
        id: string;
    };
}

export default async function PostShowPage({params}: PostShowPageProps) {
    const {slug, id} = params;

    return (
        <div className="space-y-3">
            <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
                {"< "}Back to {slug}
            </Link>
            <Suspense fallback={<PostShowSkeleton/>}>
                <PostShow id={id}/>
            </Suspense>
            <CommentCreateForm postId={id} startOpen/>
            <CommentList postId={id}/>
        </div>
    );
}
