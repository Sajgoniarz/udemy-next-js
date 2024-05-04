import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/path";
import {fetchCommentsByPostId} from "@/db/queries/comments";

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
            <PostShow id={id}/>
            <CommentCreateForm postId={id} startOpen/>
            <CommentList fetchData={() => fetchCommentsByPostId(id)}/>
        </div>
    );
}
