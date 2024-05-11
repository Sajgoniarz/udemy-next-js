import {redirect} from "next/navigation";
import paths from "@/path";
import {searchPostsByTerm} from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import {Divider} from "@nextui-org/react";
import TopicList from "@/components/topics/topic-list";

interface SearchTermProps {
    searchParams: {
        term: string,
    }
}

export default async function SearchPage({searchParams: {term}}: SearchTermProps) {

    if (!term) {
        redirect(paths.home());
    }

    return (
        <div className="grid grid-cols-4 gap-4 p4">
            <div className="col-span-3">
                <h1 className="text-xl m-2">Search Results</h1>
                <PostList fetchPosts={() => searchPostsByTerm(term)}/>
            </div>
            <div className="border shadow py-3 px-2">
                <TopicCreateForm/>
                <Divider className="my-2"/>
                <h3 className="text-lg mb-2">Topics</h3>
                <TopicList/>
            </div>
        </div>
    );
}
