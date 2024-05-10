import {Skeleton} from "@nextui-org/react";

export default function PostShowSkeleton() {
    return (
        <div className="m-4">
            <div className="my-2">
                <Skeleton className="h-8 w-8/12" />
            </div>
            <div className="p-4 border rounded space-y-2">
                <Skeleton className="h-6 w-9/12"/>
                <Skeleton className="h-6 w-9/12"/>
                <Skeleton className="h-6 w-6/12"/>
            </div>
        </div>
    );
}