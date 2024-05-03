import PostCreateForm from "@/components/posts/post-create-form";

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
            </div>
            <div className="border shadow py-3 px-2">
                <PostCreateForm slug={slug}/>
            </div>
        </div>
    )
};

export default TopicShowPage;
