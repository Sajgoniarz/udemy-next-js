import NotFound from "next/dist/client/components/not-found-error";

interface PostShowProps {
    id: string,
}

export default async function PostShow({id}: PostShowProps) {
    await new Promise(resolve => setTimeout(resolve, 2500));
    const post = await dbClient.post.findFirst({
        where: {id}
    });
    
    if(!post){
        NotFound();
    }
    
    return (
        <div className="m-4">
            <h1 className="text-2xl font-bold my-2">{post.title}</h1>
            <p className="p-4 border rounded">{post.content}</p>
        </div>
    );
}
