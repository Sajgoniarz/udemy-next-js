import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import {fetchPostsByTopic} from "@/db/queries/posts";

interface TopicShowPageProps {
    params: {
        slug: string;
    }
}

const TopicShowPage = async ({params: {slug}}: TopicShowPageProps) => {
    
    return (
        <div className="grid grid-cols-4 gap-4 p4">
            <div className="col-span-3">
                <h1 className="text-xl m-2">{slug}</h1>
                <PostList fetchPosts={() => fetchPostsByTopic(slug)} />
            </div>
            <div className="border shadow py-3 px-2">
                <PostCreateForm slug={slug}/>
            </div>
        </div>
    )
};

export default TopicShowPage;
